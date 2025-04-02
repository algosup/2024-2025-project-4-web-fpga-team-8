<h1 align="center"> Risk Management Plan </h1>

<p align="center">
Created by: Quentin CLÉMENT <br> Creation Date: 24/03/2025 <br> Last Update: 27/03/2025
</p>

<details>
<summary>

## Table of Contents

</summary>

- [Table of Contents](#table-of-contents)
- [1. Executive Overview](#1-executive-overview)
- [2. Risk Governance Structure](#2-risk-governance-structure)
- [3. Risk Identification](#3-risk-identification)
- [4. Risk Analysis and Assessment](#4-risk-analysis-and-assessment)
- [5. Risk Mitigation Strategies](#5-risk-mitigation-strategies)
- [6. Operational Risk Management](#6-operational-risk-management)
- [7. Continuous Monitoring and Reporting](#7-continuous-monitoring-and-reporting)
- [8. Review and Update Process](#8-review-and-update-process)

</details>

## 1. Executive Overview

This document outlines the risk management strategy for the Web FPGA project. It defines a process to anticipate and manage risks that could affect the timeline, quality, or delivery of project components such as Verilog parsing, frontend rendering, or system integration.

The plan includes governance roles, risk classification, severity scoring, and mitigation strategies to ensure smooth project execution from planning through delivery.

## 2. Risk Governance Structure

The project’s risk oversight is managed by a small group of people with clearly defined roles:

- **Quentin CLÉMENT** – Project Manager (general & coordination risks)  
- **Mariem ZAIANE** – Program Manager (functional and planning risks)  
- **Victor LEROY** – Technical Lead (technical and development risks)

This group meets weekly to assess existing risks, review emerging issues, and update the [Risk Register](/documents/management/riskRegister.pdf).

## 3. Risk Identification

Risks are identified through:

- Weekly project review sessions
- GitHub issue/blocker analysis
- Post-milestone reflections (e.g., after test sets or MVP submissions)
- Peer discussion during standups or informal check-ins

All risks are classified into one of the following categories:

- **School risks**: Institutional or scheduling constraints (e.g., lab access, deadline conflicts)  
- **Team member risks**: Absences, workload imbalances, or coordination challenges  
- **Client communication risks**: Misunderstandings with instructors or unclear expectations  
- **Functional risks**: Missing or incomplete features, changing documentation scope  
- **Technical risks**: Bugs, parsing failures, integration issues, or frontend rendering limitations

## 4. Risk Analysis and Assessment

Each risk is logged in the [Risk Register](/documents/management/riskRegister.pdf), where it is assessed based on:

- **Probability**: Likelihood of occurrence (scale 1–10)  
- **Impact**: Severity if the risk materializes (scale 1–10)  
- **Severity Score**: Probability × Impact  

This allows the team to rank and prioritize risks and determine where mitigation efforts should focus first.

## 5. Risk Mitigation Strategies

Each risk will be assigned one of the following strategies:

- **Avoidance**: Change the project path to eliminate the risk altogether  
- **Reduction**: Take proactive steps to reduce its likelihood or impact  
- **Transfer**: Delegate responsibility or share it across components  
- **Acceptance**: Acknowledge the risk and prepare a contingency plan

The chosen strategy will be documented in the Risk Register along with its risk owner and possible triggers.

## 6. Operational Risk Management

To manage everyday project execution risks, the following measures are in place:

- **Version Control**: All code and documentation are committed to GitHub regularly  
- **Branching and Backups**: Feature branches are used to prevent merge conflicts or loss of progress  
- **Naming Convention**: Standardized filenames avoid overwrite issues between Verilog, SDF, and pivot files  
- **Scope Enforcement**: All team members are aligned on MVP boundaries to avoid scope creep

## 7. Continuous Monitoring and Reporting

- Risks are reviewed weekly as part of regular project syncs  
- The Risk Register is kept up to date with new risks, mitigations, and status updates  
- High-severity or urgent risks are immediately escalated to the governance team  
- A short summary of risk status is included in each Weekly Report

## 8. Review and Update Process

This Risk Management Plan is a living document.  
The **Risk Register** is updated continuously throughout the project (especially during test and integration weeks) and will be reviewed as part of the final project wrap-up.