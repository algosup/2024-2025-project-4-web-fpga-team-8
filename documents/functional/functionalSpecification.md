# Functional Specifications

<details>
<summary>Table of Contents</summary>

- [Functional Specifications](#functional-specifications)
  - [1. Introduction](#1-introduction)
    - [1.1. Glossary](#11-glossary)
    - [1.2. Project Overview](#12-project-overview)
    - [1.3. Project Definition](#13-project-definition)
      - [1.3.1. Vision](#131-vision)
      - [1.3.2. Objectives](#132-objectives)
      - [1.3.3. Scope](#133-scope)
      - [1.3.4. Target Audience](#134-target-audience)
      - [1.3.5. Deliverables](#135-deliverables)
    - [1.4. Project Organization](#14-project-organization)
      - [1.4.1. Project Representatives](#141-project-representatives)
      - [1.4.2. Stakeholders](#142-stakeholders)
      - [1.4.3. Project Reviewers](#143-project-reviewers)
    - [1.5. Project Plan](#15-project-plan)
      - [1.5.1. Planning](#151-planning)
      - [1.5.2. Milestones](#152-milestones)

</details>

## 1. Introduction

### 1.1. Glossary


| **Term**                      | **Definition**                                                                                                   |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **FPGA (Field Programmable Gate Array)** | A reconfigurable integrated circuit that can be programmed to perform custom logic functions.            |
| **BEL (Basic Element)**        | Fundamental hardware components inside an FPGA, such as Flip-Flops, Look-Up Tables (LUTs), and Block RAMs.      |
| **Verilog**                    | A hardware description language (HDL) used to design and simulate digital circuits, including FPGA applications. |
| **Netlist**                    | A structural representation of an FPGA design that describes logic components and their connections after synthesis. |
| **SDF (Standard Delay Format)** | A file format that contains timing delay information for signals propagating inside an FPGA.                     |
| **Synthesis**                  | The process of converting a Verilog application into a netlist that maps logic operations to FPGA hardware elements. |
| **Place & Route (P&R)**         | The process of assigning FPGA resources to netlist components (**Place**) and determining electrical paths between them (**Route**). |
| **Testbench**                  | A Verilog file that provides test inputs and expected outputs to verify the functionality of an FPGA application through simulation. |
| **Simulator**                  | A tool that executes a Verilog testbench to model how signals propagate inside the FPGA over time.                 |
| **Frontend (Web Interface)**    | The graphical interface that allows students to select FPGA applications, visualize signal propagation, and control the simulation. |
| **Backend**                     | The server-side component responsible for processing Verilog files, generating simulation data, and providing preloaded FPGA applications. |
| **2D Floorplan View**           | A visual representation of the FPGA layout showing BELs and the routing of signals.                              |
| **Play Button**                 | A control in the web interface that starts the simulation, allowing users to see how signals propagate inside the FPGA. |
| **Step Button**                 | A control that advances the simulation by one step, showing signal changes incrementally.                          |
| **Pause/Resume Button**         | A control that stops or continues the simulation playback.                                                       |
| **Zoom & Move Controls**        | Interactive features that allow users to navigate within the FPGA floorplan visualization.                        |
| **Impulse**                     | A tool used for FPGA synthesis and place & route, converting Verilog designs into netlists and routing information. |
| **Modelsim**                    | A simulation tool that executes Verilog testbenches and models timing-based signal propagation.                   |
| **Yosys**                       | An open-source synthesis tool that converts Verilog code into a netlist.                                          |
| **VPR (Verilog to Routing)**     | A toolchain for place & route in FPGA design, often used in open-source FPGA workflows.                         |
| **GTKWave**                     | A waveform viewer that displays simulation results from FPGA testbenches.                                        |
| **Teacher Role**                | The user responsible for uploading Verilog applications and testbenches to the backend for student simulations.  |
| **Student Role**                | The user who interacts with the web interface to explore FPGA applications and visualize signal propagation.      |
| **Pivot File Format**           | A possible intermediary data format used to bridge FPGA netlist and timing information between backend and frontend. |
|

### 1.2. Project Overview

The project aims to develop a web interface for an FPGA simulator, enabling students and teachers to visualize signal propagation within an FPGA. The simulator will integrate timing simulation with a 2D representation of the FPGA layout, allowing users to see how electrical signals travel through the circuit over time. The interface will support interactive controls like zoom, navigation, step execution, and speed control.

### 1.3. Project Definition

#### 1.3.1. Vision

The primary goal of this project is to provide an educational and interactive tool for FPGA learners. By merging the 2D FPGA floorplan with real-time signal propagation, the web interface will help users understand and analyze FPGA behavior at both structural and timing levels. It will serve as a learning platform for students and a teaching aid for instructors.

#### 1.3.2. Objectives

- Develop a web-based application for visualizing FPGA signal propagation.
- Allow students to interact with the FPGA layout, selecting and analyzing predefined application examples.
- Provide real-time simulation controls, including play, step execution, speed adjustment, and pause/resume.
- Enable teachers to upload new application examples (Verilog designs and testbenches).
- Implement a backend processing system to generate necessary simulation data.
- Support two roles: teachers (backend data preparation) and students (frontend visualization and interaction).
- Deliver a functional prototype with at least two application examples (Flip-flop & LUT4).

#### 1.3.3. Scope

The project covers:

- **Frontend:** A web interface for students, displaying an interactive 2D view of the FPGA layout and signal propagation.
- **Backend:** A system allowing teachers to upload Verilog applications and testbenches, generating the required simulation data.
- **Visualization:** Graphical representation of FPGA elements (Basic Elements - BELs) and signal paths.
- **Simulation Control:** Features like zoom, pan, play, step execution, speed adjustment, and pause/resume.
- **Deliverables:** Source code, setup guides, user manuals, and at least two application examples.

#### 1.3.4. Target Audience

- **Students:** Use the web interface to learn about FPGA internals and observe signal propagation.
- **Teachers/Instructors:** Prepare and upload new FPGA applications for simulation.
- **FPGA Enthusiasts & Researchers:** Use the tool for debugging and educational purposes.

#### 1.3.5. Deliverables

| Deliverable               | Purpose                                                                                                                                         |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Functional Specifications | Detailed documentation of the features used and their non-technical aspects.                                                                    |
| Technical Specifications  | Detailed documentation on the technical implementation of software                                              
| Source Code           | The complete software implementation, including frontend, backend, and FPGA-related logic, with inline documentation.|
| Test Plan & Test Cases    | A structured set of test scenarios ensuring the accuracy, functionality, and efficiency of the FPGA simulator, covering frontend interactions, backend processing, and signal propagation validation. |
| User Manual               | End-user documentation covering installation, configuration, usage, troubleshooting, and maintenance.                                                                                                    |
| Example Applications               | EAt least two FPGA application examples (Flip-Flop & LUT4) to demonstrate functionality.
|

### 1.4. Project Organization

#### 1.4.1. Project Representatives

| Full Name             | Role              | Role Description                                                                                                                                                     | Links to LinkedIn Profiles                                              |
| --------------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Quentin CLEMENT         | Project manager   | Responsible for the overall planning, execution, and success of the project ensuring it meets scope, timeline, budget, and quality expectations.                                                                                        | [LinkedIn](https://www.linkedin.com/in/quentin-cl%C3%A9ment-939110221/)         |
| Mariem ZAIANE       | Program manager   | Responsible for the strategy, coordination, and successful delivery of the project.<br> Responsible for writing the Functional Specifications.                                     | [LinkedIn](https://www.linkedin.com/in/mariem-zaiane-2b2165225/)            |
| Victor LEROY | Tech lead         | Makes technical decisions for the project. <br> Translates the Functional Specification into Technical Specifications. <br> Does code review.                        | [LinkedIn](https://www.linkedin.com/in/victor-leroy-64baa3229/)       |
| David CUAHONTE      | Software engineer | focuses on coding, documentation, and collaborating on the design and development of software solutions.                                                                          | [LinkedIn](https://www.linkedin.com/in/david-cuahonte-527781221/)     |
| Pavlo PRENDI           | Quality assurance | Tests all the functionalities of a product to find bugs and issues. <br> Document bugs and issues. <br> Write the test plan. <br> Check that issues have been fixed. | [LinkedIn](https://www.linkedin.com/in/pavlo-prendi-674777309/)          |
|Mathis KAKAL       | Technical writer  | Responsible for creating and maintaining the project's documentation.                                                                                                | [LinkedIn](https://www.linkedin.com/in/mathis-k-a239ba10a/) |

#### 1.4.2. Stakeholders

| Role            | Representative | Expectations                                                           |
| --------------- | -------------- | ---------------------------------------------------------------------- |
| Customer      | Florent MANNI | Finished project meeting requirements                                  |
| School director | Franck JEANNIN | Clear documentation and management based on the skills learnt in class |

#### 1.4.3. Project Reviewers

External project reviewers have been appointed by the project owner to review our specifications and provide us with feedback.

### 1.5. Project Plan

#### 1.5.1. Planning

The planning process will follow a structured and sequential approach, ensuring clear deliverables and thorough documentation. While major phases will progress in order, some tasks—such as testing and frontend-backend integration—will be executed in parallel to optimize development time and ensure quality. Regular review checkpoints will be integrated to validate progress.

#### 1.5.2. Milestones

| Date         | Milestone                                                                                                                                                                                                                                                                    |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **28/02/25** |- Initial version of functional specifications <br>- Client meeting & technology selection                                                                                                                                                                                |
| **07/03/25** |-  Functional specifications refined<br>- Draft of technical specifications <br>- QA setup & test plan initiation <br>- Code environment setup for frontend & backend                                                                        |
| **14/03/25** |- Final functional specifications<br>- Technical specifications advanced <br>- Parsing verilog files <br>- Development & testing begins                  |
| **21/03/25** |-  Technical specifications refinement <br>- Test plan refinement <br>- UI development progress <br>- First draft of the user manual <br>- Code testing & debugging   |
| **28/03/25** |- Final technical specifications <br>- Continuous testing <br>- Further UI & backend improvements <br>- User manual refinement |
| **01/04/25** |- Code finalization <br>- Final testing & debugging <br>- Final version of the User manual |
|
