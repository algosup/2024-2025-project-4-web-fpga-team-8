<h1 align="center"> Management Walkthrough </h1>

<p align="center">
This document will guide you through the key management components of the Web FPGA project — what they are, how they work together, and how best to read them. <br>
If you're new to the project or reviewing our progress, this walkthrough is the best place to start.
</p>

<details>
<summary>

## Table of Contents

</summary>

- [Table of Contents](#table-of-contents)
- [1. Management with GitHub](#1-management-with-github)
- [2. Recommended Reading Order](#2-recommended-reading-order)
  - [2.1 Gantt Chart](#21-gantt-chart)
  - [2.2 KPI Dashboard](#22-kpi-dashboard)
  - [2.3 RACI Matrix](#23-raci-matrix)
  - [2.4 Risk Management Plan](#24-risk-management-plan)
  - [2.5 Risk Register](#25-risk-register)
  - [2.6 Weekly Reports](#26-weekly-reports)

</details>

## 1. Management with GitHub

We chose to manage both our **technical tasks and project documentation** using GitHub — a platform already central to our development workflow.

- [GitHub Issues](https://github.com/algosup/2024-2025-project-4-web-fpga-team-8/issues) helped us track each deliverable or challenge as a ticket, with clear ownership and progress visibility.
- The [GitHub Project Board](https://github.com/orgs/algosup/projects/59) gave us a shared view of what was planned, in progress, or done.

These tools enabled the team to stay in sync across frontend, backend, and documentation tasks, especially during critical phases like parser integration and MVP assembly.

---

## 2. Recommended Reading Order

If you're exploring the management side of the Web FPGA project, we suggest reading the documents in the order below. Each one builds on the last and reveals a bit more of the story behind our planning, priorities, and execution.

---

### 2.1 Gantt Chart

The [Gantt Chart](https://github.com/orgs/algosup/projects/59/views/4) is your entry point. It lays out the full timeline of the project: when each task was expected to start and finish, and how the overall workload was distributed across the weeks.

It also shows how the three test sets and the core technical modules (e.g. Verilog Parser, SDF Parser, Playback Engine) were spread out to fit within our 6-week deadline.

---

### 2.2 KPI Dashboard

After seeing the schedule, the [KPI Dashboard](/documents/management/managementArtifacts/KPIs.pdf) gives you insight into how things actually progressed.  
Each row represents a feature or deliverable, and the columns show **weekly progress** — both planned and actual.

From parsing scripts to frontend integration, these KPIs helped us stay grounded, and offered a quantifiable way to report on progress in our weekly updates.

---

### 2.3 RACI Matrix

The [RACI Matrix](/documents/management/managementArtifacts/raciMatrix.pdf) answers the question:  
**“Who’s doing what?”**

For each major activity — whether technical, planning-related, or documentation-based — this matrix clarifies:
- Who is **Responsible**
- Who is **Accountable**
- Who is **Consulted**
- Who is **Informed**

This helped avoid confusion around ownership, especially during parallel task execution (e.g., parser testing vs frontend layout vs test plan writing).

---

### 2.4 Risk Management Plan

Like any ambitious technical project, Web FPGA came with its share of uncertainties — parser accuracy, integration bugs, and animation timing, to name a few.

The [Risk Management Plan](/documents/management/managementArtifacts/riskManagementPlan.md) explains how we approached risk from the start:  
How we categorized risks, how we rated their severity, and how we decided what to prevent, reduce, accept, or monitor over time.

---

### 2.5 Risk Register

The [Risk Register](/documents/management/managementArtifacts/riskRegister.pdf) brings that strategy to life.  
It lists all identified risks — from tight deadlines to malformed Verilog files — along with:

- Their probability and potential impact  
- Triggers or warning signs  
- The mitigation or response strategy  
- Who’s responsible for managing them  

This register was reviewed and updated throughout the project, especially during weekly planning and retrospectives.

---

### 2.6 Weekly Reports

Finally, the [Weekly Reports](/documents/management/managementArtifacts/weekly_reports/) act as a diary of our journey through the project.  
Each report includes:

- What we achieved that week  
- Which documents or deliverables were submitted  
- Timeline status and alignment with the Gantt Chart  
- Team reflections and priorities for the week ahead

Together, these reports tell the full story of how the Web FPGA project evolved from planning to implementation — and how we worked through challenges as a team.

---

> 📚 Following the order above will give you a clear, connected view of how we planned, executed, tracked, and learned throughout this project.
