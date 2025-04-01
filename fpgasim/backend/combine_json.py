import os
import json

VERILOG_JSON_DIR = "parsed_v"
SDF_JSON_DIR = "parsed_sdf"
OUTPUT_FILE = os.path.join("combined_data", "combined_design_data.json")

IGNORE_MODULES = {"routed_POC_worst"}

def load_json(path):
    with open(path, "r") as f:
        return json.load(f)

def get_base_name(filename):
    return filename.replace("_post_synthesis", "").replace(".json", "")

def merge_designs():
    combined = []

    verilog_files = [
        f for f in os.listdir(VERILOG_JSON_DIR)
        if f.endswith(".json") and get_base_name(f) not in IGNORE_MODULES
    ]

    for vfile in verilog_files:
        vpath = os.path.join(VERILOG_JSON_DIR, vfile)
        verilog_data = load_json(vpath)
        base_name = get_base_name(vfile)

        # Look for corresponding SDF JSON
        sdf_filename = base_name + "_post_synthesis.json"
        sdf_path = os.path.join(SDF_JSON_DIR, sdf_filename)

        merged_entry = verilog_data.copy()

        if os.path.exists(sdf_path):
            sdf_data = load_json(sdf_path)
            merged_entry["timing"] = sdf_data
        else:
            merged_entry["timing"] = None

        combined.append(merged_entry)

    with open(OUTPUT_FILE, "w") as out:
        json.dump(combined, out, indent=4)

    print(f"\nCombined {len(combined)} modules into {OUTPUT_FILE}")

if __name__ == "__main__":
    merge_designs()
