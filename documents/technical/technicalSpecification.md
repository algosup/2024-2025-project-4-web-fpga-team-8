<br />
<div align="center">
  <h1 align="center">Technical Specification</h1>
  <p align="center">
    <strong>Web FPGA</strong>
    <br />
  
  </p>
</div>

<details>
<summary><b>Table of Contents</b></summary>

- [1. Audience](#1-audience)
- [2. Project Overview](#2-project-overview)
- [3. General Information](#3-general-information)
  - [3.1. Glossary](#31-glossary)
  - [3.2. Writing Conventions](#32-writing-conventions)
  - [3.3. Folder Structure](#33-folder-structure)
- [4. Technologies](#4-technologies)
  - [4.1. Frontend](#41-frontend)
  - [4.2. Backend](#42-backend)
  - [4.3. Data Storage](#43-data-storage)
  - [4.4. File Handling](#44-file-handling)
  - [4.5. Parsing Tools](#45-parsing-tools)
- [5. System Architecture](#5-system-architecture)
- [5.1. Frontend](#51-frontend)
  - [5.1.1. FPGA Layout](#511-fpga-layout)
    - [Purpose](#purpose)
    - [Implementation Summary](#implementation-summary)
    - [Parameters](#parameters)
    - [Output](#output)
  - [5.1.2. File Selector](#512-file-selector)
    - [Purpose](#purpose-1)
    - [Implementation Summary](#implementation-summary-1)
    - [API Endpoint](#api-endpoint)
    - [UI Behavior](#ui-behavior)
    - [Example File Name Cleanup](#example-file-name-cleanup)
- [5.2. Backend](#52-backend)
  - [5.2.1. Backend - `app.py`](#521-backend---apppy)
    - [Key Features](#key-features)
    - [Folder Configuration](#folder-configuration)
    - [Available Endpoints](#available-endpoints)
    - [Runtime](#runtime)
    - [CORS](#cors)
    - [Requirements](#requirements)
  - [5.2.2. File Parsing \& Conversion](#522-file-parsing--conversion)
    - [Purpose](#purpose-2)
    - [How It Works](#how-it-works)
    - [Parsing Features](#parsing-features)
    - [BEL Type Detection Logic (Verilog)](#bel-type-detection-logic-verilog)
- [6. Pivot Format Specification](#6-pivot-format-specification)
  - [6.1. Base Structure](#61-base-structure)
  - [6.1. Base Structure](#61-base-structure-1)
  - [6.2. Field Descriptions](#62-field-descriptions)
    - [Required Fields:](#required-fields)
    - [Optional Fields:](#optional-fields)
  - [6.3. Flip-Flop Example](#63-flip-flop-example)
  - [6.4. LUT Example](#64-lut-example)
- [7. Simulation Timeline \& Playback Model](#7-simulation-timeline--playback-model)
  - [7.1. Timeline Representation](#71-timeline-representation)
  - [7.2. Playback Engine](#72-playback-engine)
  - [7.3. Visual Updates per Tick](#73-visual-updates-per-tick)
  - [7.4. Example Timeline Flow](#74-example-timeline-flow)
- [8. Error Handling \& Edge Cases](#8-error-handling--edge-cases)
  - [8.1. Backend Error Cases](#81-backend-error-cases)
  - [8.2. Frontend Edge Cases](#82-frontend-edge-cases)
  - [8.3. Future Considerations](#83-future-considerations)
  - [8.4. Logging \& Developer Visibility](#84-logging--developer-visibility)
- [9. Deployment \& Environment Notes](#9-deployment--environment-notes)
  - [9.1. Environment Requirements](#91-environment-requirements)
  - [9.2. Running Locally](#92-running-locally)
- [10. Known Limitations](#10-known-limitations)
- [11. Future Work \& Roadmap](#11-future-work--roadmap)

</details>

## 1. Audience

This document is primarily intended for developers who are interested in understanding how signals propagate inside an FPGA. It is also intended to provide a clear understanding of the technologies used and the design choices made in the development of the Web FPGA.

## 2. Project Overview

The Web Interface for **FPGA Simulator** project aims to develop an interactive web-based educational tool that visualizes signal propagation inside an FPGA. The system will integrate a **2D FPGA floorplan** with dynamic signal simulation, allowing students to observe how electrical signals traverse FPGA components (BELs). Teachers will upload Verilog applications and testbenches, which the backend will process into a format suitable for visualization. The frontend will feature **zoom, pan, play, pause, step, and speed controls** to explore signal timing behavior. The backend will handle data conversion from **Verilog and SDF files** to ensure accurate simulation. The software will be open-source, with deliverables including source code, user documentation, and example applications (flip-flop & LUT4).

## 3. General Information

### 3.1. Glossary

| **Term**                         | **Definition**                                                                                                                                                                                                 |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **FPGA**                         | Field-Programmable Gate Array, an integrated circuit with configurable logic blocks and predefined routing for electrical signals. The selected FPGA is **NanoXplore NGultra** (Xilinx Series 7 for VTR flow). |
| **Basic Element (BEL)**          | Fundamental hardware resources inside an FPGA, such as **flip-flops (FFs)**, **Look-Up Tables (LUTs)**, and **Block RAM (BRAM)**.                                                                              |
| **Application**                  | A function written in **Verilog**, synthesized and executed on the FPGA.                                                                                                                                       |
| **Synthesis**                    | Translates a **Verilog application** into an **electrical netlist**, defining logic connections. Tools: **Impulse** (or **Yosys** in VTR flow).                                                                |
| **P&R (Place and Route)**        | Assigns netlist components to FPGA hardware resources (**Place**) and determines signal pathways (**Route**). Tools: **Impulse** (or **VPR** in VTR flow).                                                     |
| **Simulator**                    | Compiles **Verilog testbenches and applications** to simulate signal propagation over time. Tool: **Modelsim** (Icarus Verilog not yet supported for VTR flow).                                                |
| **Timing Netlist**               | A **Verilog-based representation** of an FPGA application, including **signal propagation delays**.                                                                                                            |
| **Standard Delay File (SDF)**    | A file containing **timing delay information** for signals traveling between FPGA elements.                                                                                                                    |
| **Software**                     | The **developed web application**, providing a **frontend** (student interface) and **backend** (teacher interface) to visualize FPGA signal propagation.                                                      |
| **Frontend (Student Interface)** | A web-based **interactive 2D visualization** of FPGA elements and signal routes, with **zoom, pan, play, pause, step, and speed control** for simulation playback.                                             |
| **Backend (Teacher Interface)**  | An interface for **uploading Verilog applications and testbenches**, converting them into a format suitable for visualization.                                                                                 |
| **Pivot File Format**            | An **intermediary file format** that facilitates **data conversion** between Verilog/SDF and the visualization system.                                                                                         |

### 3.2. Writing Conventions

To maintain consistency across the project, the following writing conventions will be used:

- **Folders**: Snake case (e.g., `frontend_components`).
- **Files**: Camel case (e.g., `signalPropagation.js`).

### 3.3. Folder Structure

The project will be organized into the following folder structure:

```
~ 2024-2025-project-4-web-fpga-team-8
│── README.md
│── documents/
│   ├── functional/
│   ├── management/
│   └── technical/
│
└── fpgasim/
    ├── backend/
    │   ├── app.py
    │   ├── verilog_parser.py
    │   ├── sdf_parser.py
    │   ├── combine_json.py
    │   ├── requirements.txt
    │   ├── uploads_v/
    │   ├── uploads_sdf/
    │   ├── parsed_v/
    │   ├── parsed_sdf/
    │   └── combined_data/
    │
    └── frontend/
        ├── index.html
        ├── vite.config.ts
        ├── package.json
        ├── public/
        └── src/
```

## 4. Technologies

### 4.1. Frontend

- **Framework**: React.js

  - Chosen for its modularity, speed, and broad ecosystem, making it ideal for building interactive web applications.

- **UI Components**: Material UI

  - Provides prebuilt, responsive components that streamline UI development and ensure a polished look.

- **Visualization**: D3.js (SVG-based)

  - Used for rendering FPGA layouts and simulating signal propagation animations efficiently.

### 4.2. Backend

- **Framework**: Python (Flask)

  - Selected for its lightweight nature and strong support for handling Verilog and SDF file parsing.

### 4.3. Data Storage

- **Format**: JSON (converted from Verilog & SDF)

  - A simple and flexible format for storing FPGA netlist and timing data after parsing.

### 4.4. File Handling

- **Storage Method**: Local storage (flat file system)

  - Avoids unnecessary complexity since files are pre-generated and provided by the customer.

### 4.5. Parsing Tools

- **Verilog Parser (`verilog_parser.py`)**  
  A custom Python script that uses regular expressions to extract module metadata from `.v` files. It detects:

  - Module name, inputs, and outputs
  - Assigned signals and logic nets
  - Basic Element (BEL) type (e.g., Flip-Flop, LUT) based on structural patterns

- **SDF Parser (`sdf_parser.py`)**  
  A custom Python script that extracts delays and timing constraints from `.sdf` files. It handles:
  - Standard and DFF-specific `IOPATH` delays
  - Timing checks (`SETUP`, `HOLD`, etc.)
  - Per-cell delay/constraint aggregation into structured JSON

## 5. System Architecture

The system architecture will define how the software components interact to achieve the desired functionality.

## 5.1. Frontend

### 5.1.1. FPGA Layout

The `FPGALayout` React component is responsible for rendering a 2D grid-based representation of the FPGA floorplan. This grid visually maps the Basic Elements (BELs) in a structured and interactive SVG element using D3.js.

#### Purpose

This component builds a static 10×10 grid where each cell represents a BEL such as a LUT, flip-flop, or BRAM. It acts as the visual foundation on which dynamic simulation data (signal states, timing, routing) will later be overlaid.

#### Implementation Summary

The core logic of the component includes:

- React Hooks:
  - `useRef`: Used to reference the `svg` DOM element directly.
  - `useEffect`: Ensures that D3 manipulations occur only after the SVG element has mounted.
- D3 Integration:
  - The SVG canvas is initialized with fixed dimensions (`500x500` pixels).
  - Nested loops (`cols` × `rows`) generate a grid of SVG `rect` elements, each sized at `50x50` pixels.
  - Each rectangle represents a BEL location, outlined with a black border and transparent fill.

#### Parameters

| Parameter  | Description                                   |
| ---------- | --------------------------------------------- |
| `rows`     | Number of horizontal cells (BEL rows)         |
| `cols`     | Number of vertical cells (BEL columns)        |
| `cellSize` | Pixel size of each grid cell (width & height) |

#### Output

The resulting SVG displays a grid of 100 squares (10×10). This layout provides the base geometry for later enhancements, including:

- Coloring cells based on signal activity
- Overlaying routing paths
- Adding hover/click interactions for tooltips

### 5.1.2. File Selector

The FileSelector component allows the user to select from a list of available FPGA applications. It retrieves example files from the backend and displays them in a dropdown menu using Material UI components.

#### Purpose

This component provides the user (typically a student or teacher) with a way to choose a pre-uploaded Verilog example for visualization. The selected file will then be passed to the simulation system for processing and rendering.

#### Implementation Summary

- State Management:
  - `examples`: Holds the list of available example files retrieved from the backend.
  - `selectedFile`: Tracks the user's current selection.
- Backend Communication:
  - On initial load (`useEffect`), a `GET` request is sent to `/examples` to retrieve a list of available files from the backend server (`API_URL`).
- Material UI Components:
  - `Select`: A dropdown list showing file names.
  - `MenuItem`: Each file is rendered as an individual item.
  - `Typography` and `Container`: For layout and text formatting.

#### API Endpoint

| Method | Endpoint    | Description                          |
| ------ | ----------- | ------------------------------------ |
| GET    | `/examples` | Returns a list of example file names |

#### UI Behavior

- The dropdown is initialized with a disabled placeholder (`"Select a file"`).
- File names are cleaned up using `.replace()` to remove suffixes like `_post_synthesis` and `.v` for better readability.
- The selected file name is stored internally, making it ready to trigger a new simulation/render.

#### Example File Name Cleanup

For readability, filenames like:

```
1ff_post_synthesis.v
```

...will be displayed as:

```
1ff
```

## 5.2. Backend

### 5.2.1. Backend - `app.py`

The backend is implemented using **Flask**, a lightweight Python web framework. It exposes several REST endpoints that serve Verilog and SDF-related files to the frontend. It also provides access to merged simulation data in JSON format.

The design is **file-based and stateless**, relying on the local file system rather than a database, which simplifies development and debugging.

#### Key Features

- Lists available simulation files in the `uploads/` directory
- Serves individual Verilog or SDF files by filename
- Serves combined `.json` files with parsed Verilog + SDF data from `combined_data/`
- Supports CORS for frontend-backend communication during local development

#### Folder Configuration

```python
UPLOAD_FOLDER = "uploads"
COMBINED_FOLDER = "combined_data"

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config["COMBINED_FOLDER"] = COMBINED_FOLDER
```

- `uploads/`: Directory where Verilog/SDF files are placed
- `combined_data/`: Stores preprocessed or merged JSON files used by the frontend

#### Available Endpoints

| Method | Endpoint               | Description                                      |
| ------ | ---------------------- | ------------------------------------------------ |
| GET    | `/examples`            | Lists all uploaded files in `uploads/`           |
| GET    | `/example/<filename>`  | Returns a specific file from `uploads/`          |
| GET    | `/combined/<filename>` | Returns a parsed JSON file from `combined_data/` |

#### Runtime

- Host: `127.0.0.1`
- Port: `5000`
- Debug Mode: Enabled by default for development

#### CORS

CORS is enabled to support local development with the React frontend (e.g., running on `localhost:5173`):

```python
from flask_cors import CORS
CORS(app)
```

#### Requirements

The backend environment is defined by the following packages listed in `requirements.txt`:

```
blinker==1.9.0
click==8.1.8
Flask==3.1.0
flask-cors==5.0.1
itsdangerous==2.2.0
Jinja2==3.1.6
MarkupSafe==3.0.2
Werkzeug==3.1.3
```

### 5.2.2. File Parsing & Conversion

The backend pipeline parses Verilog (`.v`) and SDF (`.sdf`) files and merges their extracted data into a single unified JSON structure.

#### Purpose

- **Verilog Parsing** (`verilog_parser.py`): Extracts structural data from `.v` files.
- **SDF Parsing** (`sdf_parser.py`): Extracts timing delays and constraints from `.sdf` files.
- **Combining Data** (`combine_json.py`): Merges parsed structural and timing data into a unified pivot JSON format used by the frontend.

#### How It Works

The parsing system operates in multiple stages:

```
uploads_v/            → parsed_v/     ┐
uploads_sdf/          → parsed_sdf/   ├→ combine_json.py → combined_data/combined_design_data.json
```

- `verilog_parser.py` processes files in `uploads_v/`, creating JSON files in `parsed_v/`.
- `sdf_parser.py` processes timing files from `uploads_sdf/`, creating JSON files in `parsed_sdf/`.
- `combine_json.py` matches and merges corresponding JSONs, outputting to `combined_data/`.

#### Parsing Features

**Verilog Parser:**

- Module name extraction
- Input/output signals identification
- Logic assignments and DUT signal detection
- BEL type inference (Flip-Flop, LUT)

**SDF Parser:**

- Design name and timescale extraction
- Cell-level timing delays (`IOPATH`)
- Timing constraints (`TIMINGCHECK`)

#### BEL Type Detection Logic (Verilog)

| Condition                                               | Detected BEL Type |
|---------------------------------------------------------|-------------------|
| Uses `DFF`, `NX_DFF`, or `always @(posedge ...)`        | Flip-Flop         |
| Uses `LUT_K`, `assign`, or logic expressions (`&`, `^`) | LUT               |

---

## 6. Pivot Format Specification

The **pivot format** is a simplified JSON combining parsed Verilog (structural) and SDF (timing) data.

### 6.1. Base Structure

```json
{
  "module": "example_module",
  "inputs": ["clk", "D"],
  "outputs": ["Q"],
  "bel_type": "Flip-Flop",
  "timing": { /* Optional parsed SDF timing info */ }
}
```

### 6.1. Base Structure

Each parsed Verilog module is represented as a JSON object with the following base fields:

```json
{
  "module": "example_module",
  "inputs": ["clk", "D"],
  "outputs": ["Q"],
  "bel_type": "Flip-Flop"
}
```

### 6.2. Field Descriptions

#### Required Fields:

| Field      | Type     | Description                                                             |
|------------|----------|-------------------------------------------------------------------------|
| `module`   | `string` | Name of the Verilog module                                              |
| `inputs`   | `array`  | List of input ports                                                     |
| `outputs`  | `array`  | List of output ports                                                    |
| `bel_type` | `string` | High-level classification (`"Flip-Flop"`, `"LUT"`)                      |


#### Optional Fields:

| Field            | Type     | Description                                                           |
|------------------|----------|-----------------------------------------------------------------------|
| `timing`         | `object` | Parsed timing data (delays, constraints) from corresponding SDF files |
| `nets`           | `array`  | Internal signals (if implemented in future)                           |
| `signal_history` | `object` | Signal transitions (planned for future playback)                      |

### 6.3. Flip-Flop Example

This is a minimal example representing a **D Flip-Flop**. It includes one clock input (`clk`), one data input (`D`), and one output (`Q`). The parser detects the presence of a sequential element (via `always @(posedge ...)`) and classifies the BEL type accordingly.

```json
{
  "module": "1ff",
  "inputs": ["clk", "D"],
  "outputs": ["Q"],
  "bel_type": "Flip-Flop",
  "timing": null
}
```

### 6.4. LUT Example

This example represents a 4-input Look-Up Table (LUT4). The module takes four input signals and produces a single output. The parser infers the logic-based nature of the component using `assign` statements or bitwise logic operations and sets the BEL type to `LUT`.

```json
{
  "module": "lut4",
  "inputs": ["A", "B", "C", "D"],
  "outputs": ["Y"],
  "bel_type": "LUT"
}
```

## 7. Simulation Timeline & Playback Model

The simulation timeline represents how signals evolve over time across the FPGA layout. This model is used by the frontend to animate the activity of each BEL (e.g., Flip-Flops or LUTs) in response to user controls like **play**, **pause**, **step**, and **speed**.

### 7.1. Timeline Representation

Simulation is modeled as a sequence of **discrete time steps**, each corresponding to a logical clock cycle or user-defined granularity. At each time step, the system tracks:

- The state of each **signal**
- The output of each **BEL**
- Timing information (optional, from SDF)

This data is embedded in the `signal_history` field of the pivot JSON.

For example, a simple 2-cycle simulation might look like:

```json
"signal_history": {
  "clk":  [0, 1, 0, 1],
  "D":    [1, 1, 0, 0],
  "Q1":   [0, 1, 1, 0],
  "Q2":   [0, 0, 1, 1]
}
```

Each array index corresponds to a time tick. For instance, `Q1[2] = 1` means `Q1` is high at time step 2.

### 7.2. Playback Engine

The frontend uses a simulation controller that allows users to navigate the timeline:

| Action    | Behavior                                 |
| --------- | ---------------------------------------- |
| **Play**  | Advances time steps continuously         |
| **Pause** | Freezes playback at current step         |
| **Step**  | Advances by one tick                     |
| **Speed** | Adjusts playback rate (e.g., 1x, 2x, 4x) |
| **Reset** | Returns to time step 0                   |

### 7.3. Visual Updates per Tick

At each time tick:

- BELs are colored based on output state (on/off)
- Nets (wires) may be highlighted if actively toggling
- UI components (timeline slider, labels) are updated accordingly

### 7.4. Example Timeline Flow

```plaintext
Time 0:
  clk=0, D=1, Q=0
  → BEL remains off

Time 1:
  clk=1 (posedge), D=1
  → Flip-Flop triggers, Q=1

Time 2:
  clk=0, D=0
  → No change, Q=1

Time 3:
  clk=1 (posedge), D=0
  → Flip-Flop triggers, Q=0
```

## 8. Error Handling & Edge Cases

This section outlines how the system should behave when unexpected conditions or invalid inputs occur. These safeguards are important for robustness, especially when the system is extended or deployed in a shared environment.

### 8.1. Backend Error Cases

| Scenario                               | Expected Behavior                                         |
| -------------------------------------- | --------------------------------------------------------- |
| File not found (`GET /example/<name>`) | Return 404 + error message in JSON                        |
| Upload folder is empty                 | Return an empty list to `/examples`                       |
| Malformed Verilog file                 | Skip parsing, log error, do not generate pivot file       |
| Invalid file extension                 | Ignore file (`.txt`, `.md`, etc. should be filtered out)  |
| Duplicate file names                   | Overwrite or version (manual cleanup recommended for now) |

---

### 8.2. Frontend Edge Cases

| Scenario                                 | Expected Behavior                                                          |
| ---------------------------------------- | -------------------------------------------------------------------------- |
| User selects file, but JSON is malformed | Show error message (e.g., "Invalid simulation data")                       |
| Pivot JSON has missing fields            | Use defaults or hide incomplete elements (e.g., no timeline = no playback) |
| Playback exceeds available signal data   | Clamp to last known value or pause automatically                           |
| User clicks play with no file selected   | Disable controls until a valid selection is made                           |
| Backend unavailable (network error)      | Show fallback UI (e.g., "Could not connect to backend")                    |

---

### 8.3. Future Considerations

| Topic                 | Proposed Handling                                                 |
| --------------------- | ----------------------------------------------------------------- |
| File upload failures  | Implement size/type checks, return 400 errors on violation        |
| SDF mismatch          | Compare netlists before attaching delay info                      |
| Syntax but no logic   | Warn if a file has valid syntax but no recognizable BEL structure |
| Unsupported BEL types | Flag and skip, or show as "Generic BEL" in the frontend           |

---

### 8.4. Logging & Developer Visibility

- **Backend** logs should print skipped or failed files during parsing
- **Frontend** can use `console.warn()` for partial or missing fields
- Add alert banners or toast notifications for user-facing errors

> These guardrails are lightweight now but provide a solid foundation for integrating testing, validation, and UX improvements later.

## 9. Deployment & Environment Notes

The system is currently configured for local development. Production deployment is planned but not yet implemented.

### 9.1. Environment Requirements

- **Frontend**: Node.js 18+, Vite, React, D3, Material UI
- **Backend**: Python 3.10+, Flask, Flask-CORS
- **Parsing Tools**: PyVerilog (future), `python-sdf-timing` (planned)

### 9.2. Running Locally

```bash
# Frontend
cd fpgasim/frontend
npm install
npm run dev

# Backend
cd fpgasim/backend
python app.py
```

## 10. Known Limitations

While the current implementation provides a functioning pipeline from Verilog to interactive simulation, several limitations remain:

- **No live HDL editing**: Users cannot write or modify Verilog from the interface.
- **Regex-based parsing**: Verilog parsing is done with regular expressions, which may not cover complex edge cases or nested modules.
- **No hierarchical module support**: Only flat modules are supported; submodules are not parsed or visualized.
- **No interactive wire routing**: The system visualizes signal propagation per BEL but does not display net routing or physical wire paths.
- **Playback is logical, not time-accurate**: Signal history is shown as logical steps, not real-time propagation (unless SDF is added).

> These limitations reflect intentional scope control for the MVP and can be addressed in future iterations.

## 11. Future Work & Roadmap

Several enhancements have been identified to expand the capabilities of the Web FPGA platform:

- **Hierarchy Parsing**: Support multi-module designs and nested components.
- **Advanced Signal Overlays**: Add net-level routing paths and multi-color signal animations.
- **Verilog Editor in Browser**: Allow users to write and test Verilog directly in the frontend.
- **Expanded BEL Library**: Support additional FPGA elements like BRAMs, MUXes, DSP blocks, and I/O pads.
- **Deployment Pipeline**: Add Docker setup for easy backend/frontend hosting, including Nginx reverse proxy.
- **Classroom Integration**: Add teacher dashboards, group activities, and exportable reports.

> This roadmap aims to evolve the project into a complete educational FPGA simulator.
