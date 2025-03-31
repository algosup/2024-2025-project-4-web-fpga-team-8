<h1 align="center"> Web FPGA: Interactive Simulator </h1>

<p align="center">
An educational web-based tool that visualizes signal propagation inside an FPGA.<br>
Created as part of an ALGOSUP 2024–2025 academic project.
</p>

<p align="center">
<img src="https://img.shields.io/badge/react-%2361DAFB.svg?style=for-the-badge&logo=react&logoColor=black" alt="React Badge">
<img src="https://img.shields.io/badge/d3.js-F9A03C?style=for-the-badge&logo=d3.js&logoColor=black" alt="D3.js Badge">
<img src="https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white" alt="Flask Badge">
<img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite Badge">
</p>

---

## General Information

- **Project Title:** Web FPGA — Interactive Simulator
- **Clients:** ALGOSUP, CNES
- **Team Members:** Quentin CLÉMENT, David CUAHONTE CUEVAS, Victor LEROY, Pavlo PRENDI, Mariem ZAIANE

---

## Data & File Overview

This repository contains the following core components:

```
fpgasim/
├── backend/
│   ├── combined_data/
│   ├── env/
│   ├── parsed_sdf/
│   ├── parsed_v/
│   ├── uploads_sdf/
│   ├── uploads_v/
│   ├── app.py
│   ├── combine_json.py
│   ├── sdf_parser.py
│   ├── verilog_parser.py
│   └── requirements.txt
├── frontend/
│   ├── .vite/
│   ├── deps/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   ├── index.html
│   ├── vite.config.ts
│   ├── package.json
│   ├── package-lock.json
│   ├── eslint.config.js
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   └── tsconfig.node.json
├── documents/
│   ├── functional/
│   ├── technical/
│   ├── management/
│   └── test_plan/
└── README.md
```

> File structure last updated: 2025-03-28

---

## Installing / Getting started

### Prerequisites

You’ll need the following installed:

- Python 3.10+ – [Download](https://www.python.org/downloads/)
- Node.js 18+ and npm – [Download](https://nodejs.org/)
- Vite (installed via npm)

### Backend Setup (Flask)

```bash
# Navigate to the backend folder
cd backend

# (Optional) Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Install backend dependencies
pip install -r requirements.txt

# Run the Flask API
python app.py
```

This sets up the Flask server which handles file uploads and SDF/Verilog parsing.

### Frontend Setup (React + Vite)

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

This spins up the React + D3 interface via Vite on http://localhost:5174.

---

## Developing

### Built With

- **React** — UI Framework
- **D3.js** — Data visualization for SVG-based layout
- **Vite** — Development/build tool
- **TypeScript** — Strong typing and maintainability
- **Flask** — Backend API (Python)
- **Python** — SDF/Verilog parsing logic

### Setting up Dev

Refer to [Installing / Getting Started](#installing--getting-started) for full instructions on how to set up the backend (Flask) and frontend (React + Vite) environments.

### File Watching / Hot Reload

- Frontend uses Vite for hot reload.
- Backend can optionally use `flask --reload` or `watchdog` for dev auto-restart.

---

## Data-Specific Information

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

- **How It Works :**
  - Users upload Verilog and SDF files via the web interface
  - The Flask backend parses and merges them into a unified `pivot.json`
  - The React + D3 frontend visualizes this data in a dynamic FPGA grid

---

## Related Docs

- [Technical Specification](./documents/technical/technicalSpecification.md)
- [Functional Specification](./documents/functional/functionalSpecification.md)
- [Risk Management Plan](./documents/management/riskManagementPlan.md)
- [KPI Dashboard](./documents/management/KPIs.pdf)
- [Weekly Reports](./documents/management/weekly_reports/)
- [Test Plan](./documents/test_plan/testPlan.md)

---

## License & Attribution

This project is currently intended for academic use only as part of the 2024–2025 ALGOSUP curriculum.  
For reuse or distribution outside this context, please contact the project team.

> © 2025 Quentin CLÉMENT, David CUAHONTE CUEVAS, Victor LEROY, Pavlo PRENDI, Mariem ZAIANE.
