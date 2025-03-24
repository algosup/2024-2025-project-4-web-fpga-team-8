from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Define folders
UPLOAD_FOLDER = "uploads"
COMBINED_FOLDER = "combined_data"  # NEW folder to store the combined json

# Register folders in config (optional, but nice to have)
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
    app.run(debug=True, port=5000)
