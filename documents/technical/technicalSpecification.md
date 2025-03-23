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
    - [5.1.2. File Selector](#512-file-selector)
  - [5.2. Backend](#52-backend)
    - [5.2.1. Backend - `app.py`](#521-backend---apppy)
    - [5.2.2. File Parsing & Conversion](#522-file-parsing--conversion)

</details>


## 1. Audience

This document is primarily intended for developers who are interested in understanding how signals propagate inside an FPGA. It is also intended to provide a clear understanding of the technologies used and the design choices made in the development of the Web FPGA.

## 2. Project Overview
   
   The Web Interface for **FPGA Simulator** project aims to develop an interactive web-based educational tool that visualizes signal propagation inside an FPGA. The system will integrate a **2D FPGA floorplan** with dynamic signal simulation, allowing students to observe how electrical signals traverse FPGA components (BELs). Teachers will upload Verilog applications and testbenches, which the backend will process into a format suitable for visualization. The frontend will feature **zoom, pan, play, pause, step, and speed controls** to explore signal timing behavior. The backend will handle data conversion from **Verilog and SDF files** to ensure accurate simulation. The software will be open-source, with deliverables including source code, user documentation, and example applications (flip-flop & LUT4).

   ## 3. General Information

### 3.1. Glossary

   | **Term**              | **Definition** |
|-----------------------|---------------|
| **FPGA**             | Field-Programmable Gate Array, an integrated circuit with configurable logic blocks and predefined routing for electrical signals. The selected FPGA is **NanoXplore NGultra** (Xilinx Series 7 for VTR flow). |
| **Basic Element (BEL)** | Fundamental hardware resources inside an FPGA, such as **flip-flops (FFs)**, **Look-Up Tables (LUTs)**, and **Block RAM (BRAM)**. |
| **Application**       | A function written in **Verilog**, synthesized and executed on the FPGA. |
| **Synthesis**        | Translates a **Verilog application** into an **electrical netlist**, defining logic connections. Tools: **Impulse** (or **Yosys** in VTR flow). |
| **P&R (Place and Route)** | Assigns netlist components to FPGA hardware resources (**Place**) and determines signal pathways (**Route**). Tools: **Impulse** (or **VPR** in VTR flow). |
| **Simulator**        | Compiles **Verilog testbenches and applications** to simulate signal propagation over time. Tool: **Modelsim** (Icarus Verilog not yet supported for VTR flow). |
| **Timing Netlist**   | A **Verilog-based representation** of an FPGA application, including **signal propagation delays**. |
| **Standard Delay File (SDF)** | A file containing **timing delay information** for signals traveling between FPGA elements. |
| **Software**         | The **developed web application**, providing a **frontend** (student interface) and **backend** (teacher interface) to visualize FPGA signal propagation. |
| **Frontend (Student Interface)** | A web-based **interactive 2D visualization** of FPGA elements and signal routes, with **zoom, pan, play, pause, step, and speed control** for simulation playback. |
| **Backend (Teacher Interface)** | An interface for **uploading Verilog applications and testbenches**, converting them into a format suitable for visualization. |
| **Pivot File Format** | An **intermediary file format** that facilitates **data conversion** between Verilog/SDF and the visualization system. |

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
│   │── functional/
│   │   ├── functionalSpecification.md
│   │── management/
│   │   ├── weekly_reports/
│   │   │   ├── weeklyReport<nb>.md  # Replace <nb> with report number
│   │   ├── raciMatrix.pdf
│   │── technical/
│   │   ├── technicalSpecification.md
│── fpgasim/
│   │── frontend/
│   │── backend/
│   │── uploads/
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

- **Framework**: Python (Flask or FastAPI)

    - Selected for its lightweight nature and strong support for handling Verilog and SDF file parsing.

### 4.3. Data Storage

- **Format**: JSON (converted from Verilog & SDF)

  - A simple and flexible format for storing FPGA netlist and timing data after parsing.


### 4.4. File Handling

- **Storage Method**: Local storage (flat file system)

    - Avoids unnecessary complexity since files are pre-generated and provided by the customer.

### 4.5. Parsing Tools

- **Verilog Parsing**: PyVerilog


    - A specialized library for extracting netlist data from Verilog files.

- **Timing Extraction**: python-sdf-timing

    - Used for parsing SDF files to retrieve signal propagation delays.

## 5. System Architecture

The system architecture will define how the software components interact to achieve the desired functionality. 

## 5.1. Frontend


### 5.1.1. FPGA Layout
The `FPGALayout` React component is responsible for rendering a 2D grid-based representation of the FPGA floorplan. This grid visually maps the Basic Elements (BELs) in a structured and interactive SVG element using D3.js.

#### 🔧 Purpose

This component builds a static 10×10 grid where each cell represents a BEL such as a LUT, flip-flop, or BRAM. It acts as the visual foundation on which dynamic simulation data (signal states, timing, routing) will later be overlaid.

#### 📦 Implementation Summary

The core logic of the component includes:

- React Hooks:
  - `useRef`: Used to reference the `svg` DOM element directly.
  - `useEffect`: Ensures that D3 manipulations occur only after the SVG element has mounted.
- D3 Integration:
  - The SVG canvas is initialized with fixed dimensions (`500x500` pixels).
  - Nested loops (`cols` × `rows`) generate a grid of SVG `rect` elements, each sized at `50x50` pixels.
  - Each rectangle represents a BEL location, outlined with a black border and transparent fill.

#### 📐 Parameters

| Parameter   | Description                                 |
|-------------|---------------------------------------------|
| `rows`      | Number of horizontal cells (BEL rows)       |
| `cols`      | Number of vertical cells (BEL columns)      |
| `cellSize`  | Pixel size of each grid cell (width & height) |

#### 📤 Output

The resulting SVG displays a grid of 100 squares (10×10). This layout provides the base geometry for later enhancements, including:

- Coloring cells based on signal activity
- Overlaying routing paths
- Adding hover/click interactions for tooltips

### 5.1.2. File Selector
The FileSelector component allows the user to select from a list of available FPGA applications. It retrieves example files from the backend and displays them in a dropdown menu using Material UI components.

#### 🔧 Purpose

This component provides the user (typically a student or teacher) with a way to choose a pre-uploaded Verilog example for visualization. The selected file will then be passed to the simulation system for processing and rendering.

#### 📦 Implementation Summary

- State Management:
  - `examples`: Holds the list of available example files retrieved from the backend.
  - `selectedFile`: Tracks the user's current selection.
- Backend Communication:
  - On initial load (`useEffect`), a `GET` request is sent to `/examples` to retrieve a list of available files from the backend server (`API_URL`).
- Material UI Components:
  - `Select`: A dropdown list showing file names.
  - `MenuItem`: Each file is rendered as an individual item.
  - `Typography` and `Container`: For layout and text formatting.
  
#### 🌐 API Endpoint

| Method | Endpoint   | Description                          |
|--------|------------|--------------------------------------|
| GET    | `/examples`  | Returns a list of example file names |

#### 💡 UI Behavior

- The dropdown is initialized with a disabled placeholder (`"Select a file"`).
- File names are cleaned up using `.replace()` to remove suffixes like `_post_synthesis` and `.v` for better readability.
- The selected file name is stored internally, making it ready to trigger a new simulation/render.
#### 📤 Example File Name Cleanup

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

The backend is implemented using **Flask**, a lightweight Python web framework. It serves two main purposes:

1. **File Management**: Hosts and serves pre-generated Verilog/SDF files to the frontend.
2. **Data Endpoint**: Provides access to the list of available FPGA simulation examples.

The backend is designed to be simple, stateless, and file-based, avoiding any database dependency. It runs on `localhost:5000` by default and supports **Cross-Origin Resource Sharing (CORS)** to allow requests from the frontend.

#### 🔧 Key Features

- Lists available Verilog/SDF example files
- Serves raw simulation files by filename
- Flat file structure (no subfolders)
- Configurable upload directory (`/uploads`)

#### 🗂 Folder Configuration

```python
UPLOAD_FOLDER = "uploads"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
```
All simulation files must be placed inside the uploads/ folder.

#### 🔄 Runtime

- Host: `127.0.0.1`
- Port: `5000`
- Debug Mode: Enabled by default for development

#### 🔐 CORS

CORS is enabled to allow requests from the frontend development server (e.g. React’s localhost:5173).

```python
from flask_cors import CORS
CORS(app)
```

### 5.2.2. File Parsing & Conversion

The backend includes a Verilog parser that extracts metadata from each `.v` file and generates a corresponding JSON representation. This JSON serves as a simplified **pivot format** to help the frontend understand which BELs are used and how signals are connected.

#### 🔧 Purpose

This parser analyzes Verilog modules to extract:

- Module name
- Input and output signals
- Logic signal assignments
- BEL type (e.g., Flip-Flop or LUT)

The goal is to convert structural HDL code into clean, frontend-usable metadata.

#### ⚙️ How It Works

The `parse_verilog()` function processes each Verilog file using **regular expressions** to extract relevant information. It is invoked on all `.v` files located in the `uploads/` directory and outputs corresponding `.json` files in `parsed_json/`.

#### 🔍 Parsing Features

- **Module Declaration**:
  - Extracts the module name and parameter list.
- **Signal Categorization**:
  - Detects `input`, `output`, and `logic` signals using pattern matching.
- **Signal Assignments**:
  - Recognizes both `assign` and `always` blocks for activity detection.
- **DUT Identification**:
  - Detects Device Under Test (DUT) ports, including implicit `.*` connections.
- **BEL Type Inference**:
  - Classifies the design as a Flip-Flop or LUT based on keywords and patterns.

#### 📤 Output Format (Example)

```json
{
  "module": "1ff",
  "inputs": ["clk", "D"],
  "outputs": ["Q"],
  "bel_type": "Flip-Flop"
}
```

#### 📁 File Workflow

```
uploads/
├── 1ff.v
├── 2ffs.v
└── ...

↓ Parsing step

parsed_json/
├── 1ff.json
├── 2ffs.json
└── ...
```

#### 🧠 BEL Type Detection Logic

| Condition                                              | Detected BEL Type |
|--------------------------------------------------------|-------------------|
| Uses `DFF`, `NX_DFF`, or `always @(posedge ...)`       | Flip-Flop         |
| Uses `LUT_K`, `assign`, or logic expressions (`&`, `^`) | LUT               |

