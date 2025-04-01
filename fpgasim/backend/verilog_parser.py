import re
import json
import os


def parse_verilog(file_path):
    """
    Parses a Verilog file to extract module name, inputs, outputs, and BELs (Flip-Flops, LUTs).
    Returns a dictionary with extracted data.
    """
    data = {
        "module": None,
        "inputs": [],
        "outputs": [],
        "bel_type": None,
    }

    with open(file_path, "r") as file:
        content = file.read()

    # Extract module name
    module_match = re.search(r"module\s+(\w+)\s*\(([^)]*)\)", content, re.MULTILINE)
    if module_match:
        data["module"] = module_match.group(1)
        param_list = module_match.group(2)

        # Extract signals from the parameter list
        signals = [
            sig.strip().replace("\\", "").rstrip(",")
            for sig in param_list.replace("\n", "").split(",")
        ]
        for sig in signals:
            if sig.startswith("input "):
                data["inputs"].append(sig.replace("input ", "").strip())
            elif sig.startswith("output "):
                data["outputs"].append(sig.replace("output ", "").strip())

    # Extract traditional `input` and `output` statements
    input_matches = re.findall(r"input\s+(?:wire|reg\s+)?([\w\d_,\s]+);", content)
    for match in input_matches:
        signals = [
            sig.strip().replace("\\", "").replace("input ", "")
            for sig in match.split(",")
            if "output" not in sig
        ]
        data["inputs"].extend(signals)

    output_matches = re.findall(r"output\s+(?:wire|reg\s+)?([\w\d_,\s]+);", content)
    for match in output_matches:
        signals = [
            sig.strip().replace("\\", "")
            for sig in match.split(",")
            if "input" not in sig
        ]
        data["outputs"].extend(signals)

    # Remove invalid inputs/outputs
    data["inputs"] = list(set(sig for sig in data["inputs"] if sig and not sig.startswith("output")))
    data["outputs"] = list(set(sig for sig in data["outputs"] if sig and not sig.startswith("input")))

    # Extract logic signals
    logic_matches = re.findall(r"logic\s+([\w\d_\\,\s]+);", content)
    logic_signals = {
        sig.strip().replace("\\", "")
        for match in logic_matches
        for sig in match.split(",")
    }

    # Identify assigned signals
    assigned_signals = set(re.findall(r"assign\s+([\w\d_]+)\s*=", content))

    # Capture signals assigned inside `always` blocks
    always_assigned_signals = set(
        re.findall(r"always\s*@\([^)]+\)\s*begin\s*([\w\d_]+)\s*<=", content)
    )
    assigned_signals |= always_assigned_signals

    # Identify DUT signals (explicit and implicit connections)
    dut_match = re.search(r"(\w+)\s+dut\s*\(([^)]+)\);", content)
    dut_signals = set()
    if dut_match:
        connections = dut_match.group(2).strip()

        # Handle implicit `.*` by assuming all logic signals are connected
        if connections == ".*":
            dut_signals = logic_signals
        else:
            dut_signals = {
                sig.strip().replace("\\", "").split("(")[0]
                for sig in connections.split(",")
            }

    # Classify inputs and outputs
    explicit_outputs = {"Q"}  
    explicit_inputs = logic_signals - explicit_outputs  

    if "_tb" in data["module"].lower():
        data["bel_type"] = None
        data["inputs"] = list(explicit_inputs)
        data["outputs"] = list(explicit_outputs)

    # Detect BEL Type for non-testbenches
    if data["bel_type"] is None and "_tb" not in data["module"].lower():
        if (
            re.search(r"\bDFF\b", content)
            or re.search(r"always\s*@\(\s*posedge\s+\w+", content)
            or re.search(r"\bNX_DFF\b", content)
        ):
            data["bel_type"] = "Flip-Flop"
        elif (
            re.search(r"\bLUT_K\b", content)
            or re.search(r"assign\s+\w+\s*=", content)
            or re.search(
                r"always\s*@\([\w,\s]+\)\s*begin\s*(?:.*[&|^].*)", content, re.DOTALL
            )
        ):
            data["bel_type"] = "LUT"

    return data


if __name__ == "__main__":
    input_dir = "uploads_v"
    output_dir = "parsed_v"

    os.makedirs(output_dir, exist_ok=True)

    for filename in os.listdir(input_dir):
        if filename.endswith(".v"):
            file_path = os.path.join(input_dir, filename)
            parsed_data = parse_verilog(file_path)

            output_json_path = os.path.join(output_dir, filename.replace(".v", ".json"))

            with open(output_json_path, "w") as json_file:
                json.dump(parsed_data, json_file, indent=4)

            print(f"Parsed {filename} → Saved to {output_json_path}")

    print("\nAll Verilog files parsed successfully!")