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

[WIP]


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


