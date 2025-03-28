
<h1 align="center"> Web FPGA: Interactive Simulator </h1>

<p align="center">
An educational web-based tool that visualizes signal propagation inside an FPGA.<br>
Created as part of an ALGOSUP 2024–2025 academic project.
</p>

<p align="center">
<img src="https://img.shields.io/badge/react-%2361DAFB.svg?style=for-the-badge&logo=react&logoColor=black" alt="React Badge">
<img src="https://img.shields.io/badge/d3.js-F9A03C?style=for-the-badge&logo=d3.js&logoColor=black" alt="D3.js Badge">
<img src="https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white" alt="Flask Badge">
<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js Badge">
</p>

---

## 🧾 General Information

- **Project Title:** Web FPGA — Interactive Simulator
- **Clients:** ALGOSUP, CNES
- **Team Members:** Quentin CLÉMENT, David CUAHONTE CUEVAS, Victor LEROY, Pavlo PRENDI, Mariem ZAIANE

---

## 🗂️ Data & File Overview

This repository contains the following core components:

| Filename / Folder         | Description                                                                 |
|---------------------------|-----------------------------------------------------------------------------|


> 🗓 File structure last updated: 2025-03-28

---

## 🔐 Sharing & Access Information

- **License:** Currently academic use only *(update if public license applied later)*
- **Recommended citation:**
  ```
  Clément, Q., Cuahonte Cuevas, Leroy, V., D., Prendi, P., Zaiane, M. (2025). Web FPGA: Educational FPGA Signal Simulator. ALGO'SUP Capstone Project.
  ```

---

## ⚙️ Setup Instructions

> This section is left intentionally empty for the technical team to complete.

**Setup Guide (To Be Filled):**
- Backend installation (Flask API)
- Frontend dev server (React + Vite)
- How to run locally
- How to simulate a file

---

## 🧪 Methodological Information



---

## 📈 Data-Specific Information

- **Main Output Format:** `pivot.json` — combines Verilog structure with timing data.
- **Variables per pivot file:**
  - `module`: Module name
  - `inputs[]`, `outputs[]`: Port names
  - `bel_type`: e.g. "Flip-Flop", "LUT"
  - `timing`: Parsed from SDF
  - `signal_history`: Optional — tick-by-tick value tracking

- **Units:**
  - Time values in `signal_history` follow logical ticks
  - SDF timing values expressed in simulation delays (ps or ns depending on input)

- **Missing Data Handling:** If a module lacks `signal_history`, it will be excluded from playback.

---

## 📚 Related Docs

- [📄 Technical Specification](./documents/technical/technicalSpecification.md)  
- [📄 Functional Specification](./documents/functional/functionalSpecification.md)  
- [📄 Risk Management Plan](./documents/management/riskManagementPlan.md)  
- [📊 KPI Dashboard](./documents/management/KPIs.pdf)  
- [📑 Weekly Reports](./documents/management/weekly_reports/)  
- [📋 Test Plan](./documents/test_plan/testPlan.md)

---

> For any technical questions or collaboration requests, please reach out via GitHub or the project lead.
