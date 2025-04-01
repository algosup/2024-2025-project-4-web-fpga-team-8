from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
import os

from combine_json import merge_designs

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
COMBINED_FOLDER = "combined_data"

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config["COMBINED_FOLDER"] = COMBINED_FOLDER

@app.route("/examples", methods=["GET"])
def list_examples():
    files = os.listdir(UPLOAD_FOLDER)
    return jsonify(files)

@app.route("/example/<filename>", methods=["GET"])
def get_example_file(filename):
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)

@app.route("/combined/<filename>", methods=["GET"])
def get_combined_file(filename):
    return send_from_directory(app.config["COMBINED_FOLDER"], filename)

if __name__ == "__main__":
    merge_designs()  
    app.run(debug=True, port=5000)
