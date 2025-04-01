#                                                Test Plan

<details>
<summary> Table of Contents</summary>

- [Test Plan](#test-plan)
	- [1.Introduction](#1.-introduction)
	- [2. Testing Strategy](#2.-testing-strategy)
		- [2.1 Testing Scope](#2.1-testing-scope)
			- [2.1.1 In Scope](#2.1.1-in-scope)
			- [2.1.2 Out of Scope](#2.1.2-out-of-scope)
		- [2.2 Test Approach and Methodology](#2.2-test-approach-and-methodology)
			- [2.2.1 Manual Testing](#2.2.1-manual-testing)
			- [2.2.2 Automated Testing](#2.2.2-automated-testing)
			- [2.2.3 Comparison-Based Testing](#2.2.3-comparison-based-testing)
			- [2.2.4 Regression Testing](#2.2.4-regression-testing)
			- [2.2.5 Defect Tracking](#2.2.5-defect-tracking)
	- [3. Quality Maintenance](#3.-quality-maintenance)
	- [4. Test Cases](#4.-test-cases)
	- [5. Testing Tools](#5.-testing-tools)
		- [5.1 Hardware](#5.1-hardware)
		- [5.2 Software](#5.2-software)
	- [6. Test Criteria](#6.-test-criteria)
		- [6.1 Suspension Criteria](#6.1-Suspension-Criteria)
		- [6.2 Entry Criteria](#6.2-entry-criteria)
		- [6.3 Exit Criteria](#6.3-exit-criteria)
	- [7. Github Issues Report](#7.-github-issues-report)
	- [8. Testing Schedules and Estimations](#8.-testing-schedules-and-estimations)
	- [9. Test Deliverables](#9.-test-deliverables)
	- [10. Conclusion and Acknowledgements](#10.-conclusion-and-acknowledgements)
	- [11. Sources](#11.-sources)
	- [12. Glossary](#12.-glossary)


</details>

## 1. Introduction 

The team was tasked to develop a web-based interface for an FPGA simulator. The interface will allow the users to see an animated FPGA board, where the data and electricity signals are represented. Our job is to make sure that the display is accurate, appealing, and easy to use.

📝**Note:** Look through the [Functional Specifications](https://github.com/algosup/2024-2025-project-4-web-fpga-team-8/blob/main/documents/functional/functionalSpecification.md) and [Technical specifications](https://github.com/algosup/2024-2025-project-4-web-fpga-team-8/blob/main/documents/technical/technicalSpecification.md) for a deeper understanding of the projects structure and implementation.


## 2. Testing Strategy 

The main goal of testing would be to make sure the website is able to correctly display what the files provided accomplish on the FPGA board. How would one achieve that? by running the code on the board and then comparing the 2 different results. Since we are discouraged from setting up and using the board due to time constraints, instead of comparing actual results, we will sample some data from the FPGA in order to make educated assumptions on how it should work. This will help us reduce guesswork and maintain consistency across tests. Tests will be conducted using a combination of manual and automated testing. Unit tests for front-end components will be automated and executed using **Vitest**, ensuring that component-level functionalities behave correctly.

### 2.1 Testing Scope

Testing will focus on the website's accuracy and quality.

#### 2.1.1 In Scope

- No spelling or grammar issues in UI text, error messages, help tooltips, documents etc.
- Make sure that we stay clear from design errors such as wrong spacing, font-size inconsistencies, unappealing color usage, misalignments etc. 
- The display shows accurate representations of the files.

#### 2.1.2 Out of Scope

- The display is able to calculate any file provided.
- You can interact with the visuals.
- Post deployment maintenance.

#### 2.2 Test Approach and Methodology 

The testing approach combines **manual and automated testing** to ensure accuracy and usability. Given the project's goal of accurately displaying FPGA operations on a web interface, our methodology will focus on visual verification, functional correctness, and UI consistency.

##### 2.2.1 Manual Testing

Manual testing will be used for qualitative aspects such as UI design, user experience, and visual correctness. The following areas will be checked:

- **Visual Accuracy:** Ensuring that the displayed FPGA signals and animations match the expected behavior.
- **UI/UX Validation:** Confirming that the interface is clear, intuitive, and free of inconsistencies (e.g., spacing, font size, colors).
- **Content Review:** Checking for typos, grammar errors, and clarity in tooltips, messages, and documentation.

##### 2.2.2 Automated Testing

Automated testing will be used for repeatable, functional tests using **Vitest** to validate:

- Ensuring that each UI component correctly renders under different conditions.
- Checking that sampled FPGA data is processed and displayed as expected.
- Testing edge cases where invalid or unexpected data is provided.

##### 2.2.3 Comparison-Based Testing

Since we do not have access to the full FPGA board for real-time testing, **sampled FPGA data** will be used as a reference to validate visual outputs. Expected behavior will be inferred from these samples, and the test cases will be designed accordingly.

##### 2.2.4 Regression Testing

Each new update will undergo regression testing to confirm that previous functionalities remain intact. This will be achieved by re-running automated tests and visually checking key UI elements.

##### 2.2.5 Defect Tracking

All identified defects will be logged in **GitHub Issues**, categorized by severity (Critical, High, Medium, Low), and tracked until resolved.

This structured approach ensures that the interface remains reliable, visually appealing, and functionally correct while balancing time constraints.

## 3. Quality Maintenance

The quality assurance will perform spellchecks and ensure the structure of other documents are of an expected quality. They will also ensure that the code is clean and with sufficient amount of comments for understanding comprehension.
## 4. Test Cases

The table underneath represents the template for all the different test cases designed during this project. There should also be one test case for every single test we will perform.

Here is the template of a test case:

| Test Case ID    | The ID of the test case                                             |
| --------------- | ------------------------------------------------------------------- |
| Test Title      | The title of the test case.                                         |
| Objective       | What the test case is supposed to accomplish.                       |
| Prerequisites   | What should already be in place for the test case to be successful. |
| Steps           | The steps taken to perform the test case.                           |
| Expected Result | The result needed for the test case to be successful.               |
| Status          | Failed, Passed, Not tested.                                         |
| Notes           | Any notes to keep in mind when performing the test case             |
## 5. Testing Tools

### 5.1 Hardware 

Lenovo Thinkpad
Processor	13th Gen Intel(R) Core(TM) i7-1355U   1.70 GHz
Installed RAM	16.0 GB (15.7 GB usable)
Device ID	D2A39D0B-08F9-4CC0-8C61-F6EB30E374E6
Product ID	00355-61080-22427-AAOEM
System type	64-bit operating system, x64-based processor
Pen and touch	No pen or touch input is available for this display

### 5.2 Software

- Visual Studio Code
- Vite/Vitest
- Git
- Github

## 6. Test Criteria 

### 6.1 Suspension Criteria 

If a test reaches the suspension criteria, we will halt the subsequent testing. The development and quality assurance teams will then collaborate to address and resolve the issue before proceeding. This approach ensures that problems are handled individually, preventing the inclusion of unresolved issues in the program and avoiding the creation of additional problems.

### 6.2 Entry Criteria

The entry criteria are the prerequisites that must be met to ensure the test can be conducted in the best possible conditions. These include:
- Confirming that testing is done on a valid version of the code;
- Ensuring the necessary unit tests are available;
- Verifying that the testing environment is correctly configured.

### 6.3 Exit Criteria

The exit criteria define the requirements for concluding the testing phase. These include:
- Achieving a success rate of at least 80%;
- Ensuring there are no critical or high-severity defects during testing;
- Reporting all issues of medium or low severity.

## 8. Github Issues Report
### Document Review

To provide a better track on document reviews, a template was created on the GitHub issue, allowing everyone to check their own document review to change and improve their documents accordingly.

The Document template was created with the following parts:

| 🎯Task Overview          | Here is where we provide a brief summary of the task.                                 |
| ------------------------ | ------------------------------------------------------------------------------------- |
| 📋**Description**        | **Here is where we explain the task in detail, including context that is necessary.** |
| ✅**Acceptance criteria** | **Here we list the criteria that will define when the task is considered complete.**  |
| 📝**Additional Notes**   | **Here we can include any extra information or resources related to the task.**       |


You can review the template by following this [link.](https://github.com/algosup/2024-2025-project-4-web-fpga-team-8/blob/main/.github/ISSUE_TEMPLATE/task.yaml)

### Dev Review

A development template has also been created in order to keep track of the code and to ensure a readable and well-functioning algorithm.  
This template is designed in the same way as the document review template. In other words, there are three main parts, which are:

| -                        | -                                                                                                                                                            |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 📚Background Information | Here we provide context and necessary details about the project or issue, including any relevant history or previous decisions that led to the current task. |
| 💡Improvements           | Here we outline the specific changes or enhancements to be made, focusing on how the task will add value or solve current challenges.                        |
| 📝Other Suggestions      | Here we include any additional ideas, alternative approaches, or related recommendations that could further optimize the outcome.                            |

The only difference with the previously stated template is in the Improvement(s)' content. It would be composed of:

- Coding convention:
    - It would identify all the errors regarding the coding conventions.
- Spelling errors:
    - This section would be the same as the one in the document review template, it would mainly consist of listing any spelling errors found inside the code.
- Outputs errors:
    - During the review, tests will be done. Therefore, if the output of these tests isn't the one expected, they will be written in this section.

You can review the template by following this [link.](https://github.com/algosup/2024-2025-project-4-web-fpga-team-8/blob/main/.github/ISSUE_TEMPLATE/task.yaml)

## 9. Testing Schedule and Estimations

#### Task Time Estimation

| Task                        | Duration |
| --------------------------- | -------- |
| Functional Specifications   | 3 hour   |
| Technical Specifications    | 5 hour   |
| Test Plan writing           | 6 hour   |
| Test Plan review            | 1 hour   |
| Test Case writing           | 10 hours |
| Test Case application       | 30 hours |
| User manual review          | 1 hour   |
| Management review           | 2 hour   |
| Bug reports                 | 3 hours  |
| Bug data report creation    | 3 hours  |
| Bug data report fulfillment | 5 hours  |

All the defined durations for each task only are expected. Therefore, if a task takes more time than needed, overtime hours could be done to complete these tasks before their deadlines.

## 10. Test Deliverables

All the test deliverables should be delivered on the 25th of March.

- **Test plan:** It will define how the tests should be done and the strategy chosen.
- **Test cases:** It will contain all the tests that will be done to see if the product is functional.
- **Bug reports:** Each will contain a report about a bug found during the test sessions.
- **Bug data report:** It will allow us to see all of the reports in one place.

## 11. Conclusion and Acknowledgements 

The testing part of a project is really important. It is there to ensure the good behavior of the product, but also to have constant documentation to not be looked down on.

We would thank all the members of the team who worked on this project.

Finally, we would then thank [ALGOSUP](https://algosup.com/) for this project and this opportunity to develop our skills once again.

## 12. Sources

- [Functional Specifications](https://github.com/algosup/2024-2025-project-4-web-fpga-team-8/blob/main/documents/functional/functionalSpecification.md)
- [Technical Specifications](https://github.com/algosup/2024-2025-project-4-web-fpga-team-8/blob/main/documents/technical/technicalSpecification.md)
- [Vite](https://vite.dev/)
- [Vitest](https://vitest.dev/)
- [Github](https://github.com/)
## 13. Glossary


| Term                | Definition                                                                                                                                                                                          |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FPGA                | Field-Programmable Gate Array; a reconfigurable integrated circuit used to simulate and prototype hardware designs, central to this project's visual representation of data and electrical signals. |
| Vitest              | A testing framework designed for unit tests in front-end development, used here to verify component-level functionalities and ensure code behaves as expected.                                      |
| Manual Testing      | A process where testers manually execute test cases without automation, focusing on UI accuracy, user experience, and visual correctness of the FPGA simulation display.                            |
| Automated Testing   | The use of scripts and testing tools to execute test cases automatically, ensuring repeatable and consistent validation of the application's functionality.                                         |
| Test Case           | A documented set of conditions, inputs, and expected outcomes used to determine if a feature or component functions correctly.                                                                      |
| Regression Testing  | Testing conducted after changes or fixes to ensure that previously working functionalities continue to operate as expected.                                                                         |
| Entry Criteria      | The prerequisites that must be met before testing can begin, such as having a valid code version and a correctly configured testing environment.                                                    |
| Exit Criteria       | The conditions that must be fulfilled to conclude the testing phase, including a minimum success rate and the resolution of critical defects.                                                       |
| Code Coverage       | A metric that indicates the percentage of source code executed during testing, helping identify untested areas.                                                                                     |
| Bug Report          | A detailed document that describes an identified defect, including steps to reproduce, severity, and the current status of the issue.                                                               |
| Git                 | A distributed version control system used for tracking changes in source code during software development.                                                                                          |
| Github              | A web-based platform for hosting Git repositories that facilitates collaboration, issue tracking, and continuous integration.                                                                       |
| Test Deliverables   | The documented outputs of the testing process, which include test plans, test case documents, execution reports, bug logs, and final summary reports.                                               |
| Test Plan           | A comprehensive document that outlines the testing strategy, scope, resources, schedule, deliverables, and criteria for the testing process.                                                        |
| Suspension Criteria | The predefined conditions that, when met, cause the testing process to be halted so that issues can be resolved before continuing further testing.                                                  |
 