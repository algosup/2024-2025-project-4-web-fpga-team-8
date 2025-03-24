import re
import json
import os

def parse_sdf(file_path):
    """
    Parses an SDF file to extract timing delays and constraints.
    Returns a dictionary containing extracted data.
    """
    data = {"design": None, "timescale": None, "cells": []}

    with open(file_path, "r") as file:
        content = file.read()

    # Extract design name and timescale
    design_match = re.search(r"\(DESIGN\s+\"([\w\d_]+)\"\)", content)
    if design_match:
        data["design"] = design_match.group(1)

    timescale_match = re.search(r"\(TIMESCALE\s+([\d\.]+\s+\w+)\)", content)
    if timescale_match:
        data["timescale"] = timescale_match.group(1)

    # Extract all cell instances
    cell_blocks = re.findall(r"\(CELL\s+([\s\S]+?)\s*(?=\(CELL|\Z)", content, re.DOTALL)

    for cell_block in cell_blocks:
        cell_data = {"cell_type": None, "instance": None, "delays": {}, "constraints": {}}

        # Extract cell type and instance name
        cell_type_match = re.search(r"\(CELLTYPE\s+\"([\w\d_]+)\"\)", cell_block)
        if cell_type_match:
            cell_data["cell_type"] = cell_type_match.group(1)

        instance_match = re.search(r"\(INSTANCE\s+([\w\d_\\\$\~\^\.\:]+)\)", cell_block)
        if instance_match:
            cell_data["instance"] = instance_match.group(1).replace("\\", "")
        else:
            cell_data["instance"] = "UNKNOWN_INSTANCE"

        print(f"\nParsing CELL: {cell_data['instance']} (Type: {cell_data['cell_type']})")

        # Function to safely parse delay strings
        def parse_delay_value(delay_str):
            parts = delay_str.split(":")
            while len(parts) < 3:
                parts.append(parts[-1])
            try:
                return {
                    "min": float(parts[0]) if parts[0] else 0.0,
                    "typ": float(parts[1]) if parts[1] else float(parts[0]),
                    "max": float(parts[2]) if parts[2] else float(parts[1]),
                }
            except ValueError:
                return {"min": 0.0, "typ": 0.0, "max": 0.0}

        # Extract standard IOPATH delays
        delay_blocks = re.findall(
            r"\(IOPATH\s+([\w\d_\[\]\(\)\.]+)\s+([\w\d_\[\]\(\)\.]+)\s+\(([-\d\.\:]+)\)\s+\(([-\d\.\:]+)\)\)",
            cell_block,
        )
        for delay in delay_blocks:
            input_signal, output_signal, delay1, delay2 = delay
            cell_data["delays"][f"IOPATH {input_signal} {output_signal}"] = parse_delay_value(delay1)

        # Extract DFF-specific IOPATH delays
        dff_delay_blocks = re.findall(
            r"\(IOPATH\s*\(\s*(?:posedge|negedge)?\s*([\w\d_\$\~\^\.\:]+)\s*\)\s+([\w\d_\$\~\^\.\:]+)\s+\(\s*([-\d\.]+):([-\d\.]+):([-\d\.]+)\s*\)",
            cell_block,
            re.MULTILINE
        )

        for dff_delay in dff_delay_blocks:
            clock_signal, output_signal, min_val, typ_val, max_val = dff_delay
            cell_data["delays"][f"IOPATH (posedge {clock_signal}) {output_signal}"] = {
                "min": float(min_val),
                "typ": float(typ_val),
                "max": float(max_val),
            }

        print(f"\nFull CELL block for {cell_data['instance']}:\n{cell_block}")

        # Extract TIMINGCHECK block
        timing_check_match = re.search(r"\(TIMINGCHECK\s*((?:\s*\(.*\))*)\s*\)", cell_block, re.DOTALL)

        if timing_check_match:
            timing_check_block = timing_check_match.group(1).strip()
            print(f"Found TIMINGCHECK block in {cell_data['instance']}:\n{timing_check_block}")
            print("Raw TIMINGCHECK block:")
            print(repr(timing_check_block))

            # Extract constraints from TIMINGCHECK
            timing_constraints = re.findall(
                r"\(\s*(SETUP|HOLD|RECREM|SETUPHOLD)\s+([\w\d_\$\~\^\.\:]+)\s+\(\s*(?:\s*(posedge|negedge)\s+)?([\w\d_\$\~\^\.\:]+)\s*\)\s*\(\s*(-?[\d\.]+)\s*:\s*(-?[\d\.]+)\s*:\s*(-?[\d\.]+)\s*\)\s*\)",
                timing_check_block
            )

            print(f"\nExtracted {len(timing_constraints)} constraints in {cell_data['instance']}:")
            for check in timing_constraints:
                print(f"Matched constraint: {check}")

            if timing_constraints:
                for check in timing_constraints:
                    check_type, signal, edge, clock, min_val, typ_val, max_val = check
                    key = f"{check_type} {signal} ({edge or ''} {clock})".strip()

                    min_val = float(min_val)
                    typ_val = float(typ_val) if typ_val else min_val
                    max_val = float(max_val) if max_val else typ_val

                    print(f"Storing constraint: {key} → min: {min_val}, typ: {typ_val}, max: {max_val}")

                    cell_data["constraints"][key] = {
                        "min": min_val,
                        "typ": typ_val,
                        "max": max_val,
                    }
            else:
                print(f"No constraints found in {cell_data['instance']}.")
        else:
            print(f"No TIMINGCHECK found in {cell_data['instance']}")

        if cell_data["cell_type"] and cell_data["instance"]:
            data["cells"].append(cell_data)

    return data


# Main execution
if __name__ == "__main__":
    input_dir = "uploads_sdf"
    output_dir = "parsed_sdf"
    os.makedirs(output_dir, exist_ok=True)

    for filename in os.listdir(input_dir):
        if filename.endswith(".sdf"):
            file_path = os.path.join(input_dir, filename)
            print(f"Processing {filename}...")
            parsed_data = parse_sdf(file_path)

            output_json_path = os.path.join(
                output_dir, filename.replace(".sdf", ".json")
            )
            with open(output_json_path, "w") as json_file:
                json.dump(parsed_data, json_file, indent=4)
            print(f"Parsed {filename} → Saved to {output_json_path}")

    print("Parsing completed!")
