# Akash Agarwal — Personal, Academic & Technical Profile

**Last Updated:** September 2026

---

## About Me

I am **Akash Agarwal**, a third-year B.Tech student at **Kalinga Institute of Industrial Technology (KIIT), Bhubaneswar**, pursuing **Computer Science & Engineering with a specialization in Artificial Intelligence & Machine Learning**. I am part of the **2024–2028** batch and currently hold a **CGPA of 8.74/10**.

My work spans **software engineering, full-stack web development, backend systems, AI/ML, developer tooling, optimization systems, and LLM-based research**. I primarily work with **JavaScript/TypeScript, React, Next.js, Node.js, Python, FastAPI, REST APIs, databases, and modern AI/ML tooling**.

I have gained practical experience through an ML internship at **Infiltrix**, technical leadership at the **AlgoZenith KIIT Chapter**, and an 8-week research internship at **LNMIIT** focused on smart-contract verification using large language models. Alongside internships and student leadership, I build technically substantial projects that combine frontend systems, backend architecture, data processing, optimization, concurrency, and applied AI.

---

# Education

## Kalinga Institute of Industrial Technology (KIIT)

**Degree:** B.Tech in Computer Science & Engineering — Artificial Intelligence & Machine Learning  
**Duration:** 2024–2028  
**Location:** Bhubaneswar, Odisha, India  
**Current CGPA:** **8.74/10**

### Relevant Academic Areas

- Data Structures & Algorithms
- Object-Oriented Programming
- Database Management Systems
- Operating Systems
- Computer Networks
- Software Engineering
- Computer Organization & Architecture
- Probability & Statistics
- Artificial Intelligence & Machine Learning
- Image Processing

---

# Work & Technical Experience

## Infiltrix — Machine Learning Development Intern

**Duration:** December 2025 – Present  
**Location:** Bhubaneswar, India

At Infiltrix, I work on backend systems that connect machine-learning models with user-facing applications.

### Work

- Built asynchronous **Python/FastAPI ML inference pipelines**.
- Worked on non-blocking request handling and optimized serialization.
- Reduced end-to-end prediction latency by approximately **30%** in the relevant implementation.
- Designed backend scoring workflows.
- Defined and documented **REST API contracts** between ML services and applications.
- Integrated **Hugging Face transformer models** for NLP-oriented workloads.
- Worked on the interface between model inference, backend processing, and application-level data flows.

### Technologies

`Python` · `FastAPI` · `REST APIs` · `Hugging Face Transformers` · `NLP` · `Async Programming`

---

## AlgoZenith KIIT Chapter

### Web Developer

**Duration:** January 2026 – May 2026

### Technical Lead

**Duration:** May 2026 – Present

AlgoZenith KIIT Chapter is a student technical community focused on software development and competitive programming. I initially joined the development team and later moved into a technical leadership role.

### Responsibilities

- Worked on and later led development of the chapter's full-stack platform.
- Built frontend functionality using **React and TypeScript**.
- Worked on backend services using **Node.js and Express.js**.
- Developed **REST APIs** for event-registration and user-data workflows.
- Worked with **MongoDB and Firebase** for data storage and application workflows.
- Conducted code reviews and contributed to technical decision-making.
- Authored **20+ tested algorithmic problems**.
- Helped organize **2+ programming contests**.
- Optimized the local Vite development pipeline, reducing build time by approximately **40%** in the measured setup.

### Website

https://algozenithkiit.codes

### Technologies

`React` · `TypeScript` · `Node.js` · `Express.js` · `MongoDB` · `Firebase` · `REST APIs` · `Vite`

> AlgoZenith KIIT Chapter is a voluntary student-society leadership role, not an employer.

---

## LNMIIT Undergraduate Summer Internship Program — LUSIP 2026

**Project:** Smart Contract Verification using LLM  
**Institute:** The LNM Institute of Information Technology (LNMIIT)  
**Mentor:** Dr. Imran Alam  
**Duration:** 8 weeks, June–July 2026

The project explored whether large language models could reliably identify vulnerabilities in Solidity smart contracts and how such systems should be evaluated under controlled conditions.

### Work

- Built a **Python benchmarking pipeline** for LLM-based Solidity vulnerability detection.
- Used established datasets including:
  - SmartBugs Curated
  - SolidiFI
- Captured structured predictions, vulnerability categories, latency, failures, and evaluation outputs.
- Normalized model responses into machine-readable formats.
- Produced reproducible **JSON/CSV results**.
- Evaluated multiple model families under consistent:
  - prompts
  - output schemas
  - parsing rules
  - evaluation rules
- Worked with local/quantized models through **Ollama** due to hardware and VRAM constraints.
- Evaluated model families including:
  - Qwen
  - DeepSeek Coder
  - Code Llama
  - Mistral

### Security Areas Studied

- Reentrancy
- Access-control vulnerabilities
- Arithmetic vulnerabilities
- MEV / front-running
- Flash-loan-related manipulation
- Proxy / delegatecall / storage risks
- Business-logic vulnerabilities

### Technologies

`Python` · `Solidity` · `LLMs` · `Ollama` · `SmartBugs Curated` · `SolidiFI` · `JSON` · `CSV`

---

# Projects

## 1. CodeFlowViz 2.0

**Type:** Developer Tool / Full-Stack System  
**Role:** Lead Developer  
**Repository:** https://github.com/kauntiaakash2/CodeFlowViz-2.0  
**Live:** https://code-flow-viz-2-0-frontend.vercel.app/

### Overview

**CodeFlowViz 2.0** is an interactive JavaScript execution visualizer designed to make program execution easier to understand. Instead of only showing source code and final output, the system captures execution events and turns them into a replayable timeline.

The project combines frontend visualization with backend code instrumentation and execution infrastructure.

### What It Does

- Accepts JavaScript code from an interactive editor.
- Instruments source code using **AST-based analysis**.
- Executes code through a dedicated Node.js execution workflow.
- Captures:
  - console output
  - execution events
  - control flow
  - variable-state snapshots
  - execution timing
  - timeout state
- Converts execution data into an interactive replayable visualization.

### Architecture

```text
User
  ↓
Next.js / React Frontend
  ↓
Express API
  ↓
AST Instrumentation
  ↓
Node.js Execution Service
  ↓
Worker Thread
  ↓
Structured Execution Events
  ↓
Timeline / Flow Visualization
```

### Engineering Decisions

One of the major design considerations was preventing CPU-intensive code execution from blocking the primary Node.js request-handling path. The system therefore uses **worker threads** for execution workloads.

Another architectural decision was separating the user-facing frontend from long-running execution workloads rather than depending entirely on short-lived serverless execution.

The current execution mechanism should be understood as execution isolation from the main request thread, **not as a production-grade security sandbox for arbitrary untrusted code**.

### Technologies

`Next.js` · `React` · `TypeScript` · `Node.js` · `Express.js` · `Acorn` · `Worker Threads` · `Monaco Editor` · `React Flow` · `Zustand` · `Tailwind CSS` · `Framer Motion`

---

## 2. FinVerify AI

**Type:** AI/Data + Full-Stack Application  
**Role:** Lead Developer  
**Repository:** https://github.com/kauntiaakash2/FinVerifyAI  
**Live:** https://fin-verify-ai.vercel.app

### Overview

**FinVerify AI** is a financial-claim verification system designed to evaluate financial statements or claims using real-world market information from multiple data sources.

Rather than simply generating an answer, the system combines financial data retrieval, validation, confidence scoring, and source attribution to produce a structured verification result.

### What It Does

- Accepts a financial claim as input.
- Retrieves relevant market information from external financial-data sources.
- Processes and validates the available evidence.
- Generates a confidence-oriented verification result.
- Returns source attribution and structured API responses.

### Backend & Data Pipeline

The backend uses **FastAPI** and asynchronous data processing to communicate with multiple external sources. The system includes:

- asynchronous external-data fetching
- fallback financial-data sources
- caching
- input validation
- structured Pydantic responses
- optimized serialization
- automated API and verification testing

Tested API responses remained below approximately **2 seconds** in the relevant development/test setup.

### Technologies

`Python` · `FastAPI` · `scikit-learn` · `React` · `yfinance` · `Pydantic` · `Pytest` · `REST APIs`

> Older accuracy figures used in previous resume drafts are intentionally not treated as verified current metrics.

---

## 3. Smart Contract Verification using LLM

**Type:** Research / AI Security / Benchmarking  
**Associated Program:** LNMIIT LUSIP 2026

### Overview

This project studies the use of **large language models for Solidity smart-contract vulnerability detection**.

The focus was not simply to ask an LLM whether a contract was vulnerable. The project instead developed a controlled benchmarking workflow so different models could be compared using consistent data, prompts, schemas, parsing, and evaluation conditions.

### Technical Pipeline

```text
Solidity Contract Dataset
        ↓
Prompt / Evaluation Template
        ↓
Local LLM Inference
        ↓
Structured Prediction
        ↓
Output Normalization
        ↓
Vulnerability Classification
        ↓
Latency / Failure Tracking
        ↓
JSON / CSV Evaluation Results
```

### Main Contributions

- Built the end-to-end evaluation pipeline in Python.
- Used SmartBugs Curated and SolidiFI as benchmark sources.
- Created structured model output formats.
- Tracked inference latency and failures.
- Categorized vulnerability predictions.
- Compared multiple model families.
- Adapted the original inference approach to local quantized models after encountering hardware/VRAM limitations.
- Used **Ollama** as the practical local-model runtime.

### Key Engineering Lesson

A meaningful LLM benchmark requires controlled evaluation conditions. Differences in prompts, model configuration, parsing, datasets, runtime, or evaluation rules can invalidate direct model comparisons.

### Technologies

`Python` · `Solidity` · `LLMs` · `Ollama` · `Qwen` · `DeepSeek Coder` · `Code Llama` · `Mistral`

---

## 4. AlgoZenith KIIT Chapter Platform

**Type:** Full-Stack Community Platform  
**Website:** https://algozenithkiit.codes

### Overview

The **AlgoZenith KIIT Chapter website/platform** acts as a technical and information hub for the chapter's activities, events, resources, and community workflows.

I contributed to the platform first as a web-development team member and later took technical ownership as Technical Lead.

### Contributions

- Developed responsive frontend functionality.
- Worked with **React and TypeScript**.
- Built Node.js/Express backend functionality.
- Designed and maintained REST-based workflows.
- Integrated MongoDB and Firebase-backed data flows.
- Worked on event registration and user-data functionality.
- Conducted code reviews.
- Managed technical development decisions and delivery.
- Optimized the Vite development pipeline.

### Technologies

`React` · `TypeScript` · `Node.js` · `Express.js` · `MongoDB` · `Firebase` · `Tailwind CSS` · `REST APIs` · `Vite`

---

## 5. ReSlot — Minimum-Disruption Timetable Recovery

**Type:** Full-Stack Optimization System / Scheduling Platform  
**Repository:** https://github.com/kauntiaakash2/ReSlot  
**Hackathon:** Web-A-Thone 2.0 — Nexus Spring Of Code  
**Problem Statement:** AI-Based Timetable Generation System

### Overview

**ReSlot** is a timetable-generation and recovery system designed around a specific operational problem: a timetable may be valid when it is first published but become invalid later because of teacher absence, room closure, laboratory unavailability, or blocked timeslots.

Instead of regenerating the entire timetable whenever such a disruption occurs, ReSlot attempts to produce a new valid schedule while changing **as little of the already-published timetable as possible**.

Its central concept is:

> **Minimum-Disruption Timetable Recovery**

The optimization priority is:

```text
Constraint Validity
        >
Schedule Stability
        >
Soft Preferences
```

### Core Workflow

```text
Institution Data
    ↓
Scheduling Constraints
    ↓
Initial Timetable Generation
    ↓
Candidate Review
    ↓
Published Baseline
    ↓
Real-World Disruption
    ↓
Minimum-Change Repair
    ↓
Before/After Comparison
    ↓
Human Approval
    ↓
Republished Timetable
```

### Core Capabilities

- Conflict-free timetable generation.
- Teacher, room and cohort availability constraints.
- Room-capacity and room-type constraints.
- Support for classroom and laboratory requirements.
- Minimum-change timetable repair after a disruption.
- Published timetable used as an immutable repair baseline.
- Before/after comparison of schedule versions.
- Stability metrics.
- Independent schedule validation.
- Explicit solver-status reporting.
- Human approval before publishing a repaired schedule.

### Optimization Engine

ReSlot uses **Google OR-Tools CP-SAT** for deterministic combinatorial optimization.

The solver enforces hard constraints including:

- no teacher overlap
- no cohort overlap
- no room overlap
- teacher availability
- room availability
- institution-wide blocked periods
- room capacity
- room/laboratory compatibility
- required session assignment
- valid session duration within the teaching day

For timetable repair, the existing published timetable becomes the baseline. Candidate schedules are penalized for moving existing sessions, with stronger penalties for more disruptive changes.

The implemented movement model uses:

- room change = 1
- time/start change = 4
- day change = 10

The objective prioritizes reducing the number of changed sessions before optimizing movement severity and softer preferences.

### Architecture

```text
Administrator / Scheduler
          ↓
Next.js Web Application
          ↓
FastAPI Backend
          ↓
Scheduling Services
          ↓
Google OR-Tools CP-SAT
          ↓
Independent Validator
          ↓
Diff / Explanation Engine
          ↓
PostgreSQL Persistence
```

### Backend

The backend is built using **FastAPI and Pydantic**.

Responsibilities include:

- API validation
- authentication and role checks
- resource management
- scheduling workflows
- timetable generation
- timetable repair
- CSV import validation
- schedule state transitions
- persistence
- safe API error handling

### Database Design

The relational model manages:

- organizations
- users and roles
- teachers
- rooms
- cohorts
- courses
- constraints
- schedule versions
- schedule entries
- disruptions
- solver runs

Published schedules are preserved through immutable snapshots so future data changes do not rewrite historical timetables.

### Reliability

ReSlot distinguishes solver states such as:

- `OPTIMAL`
- `FEASIBLE`
- `INFEASIBLE`
- `UNKNOWN`
- `MODEL_INVALID`

The system independently validates solver output before a timetable can be stored or published.

### Authentication & Security

The system includes:

- Supabase authentication integration
- administrator, scheduler and viewer roles
- organization-scoped access
- server-side payload validation
- environment-based secret handling
- explicit CORS configuration
- immutable schedule snapshots
- stale-version protection
- independent hard-constraint validation before publication

### Technologies

**Frontend:**  
`Next.js` · `React` · `TypeScript` · `Tailwind CSS`

**Backend:**  
`Python` · `FastAPI` · `Pydantic`

**Optimization:**  
`Google OR-Tools CP-SAT`

**Database:**  
`PostgreSQL` · `SQLAlchemy` · `Alembic`

**Authentication:**  
`Supabase Auth`

**Testing:**  
`Pytest` · `Vitest` · `Testing Library`

**DevOps / Deployment:**  
`Docker` · `GitHub Actions` · `Vercel` · container hosting · managed PostgreSQL

### Important Technical Distinction

Although the original hackathon problem statement refers to an **AI-Based Timetable Generation System**, ReSlot's runtime scheduling decisions are not generated by an LLM. The actual timetable-generation and repair logic uses a **deterministic constraint-optimization solver** through OR-Tools CP-SAT.

AI-assisted development tools such as OpenAI Codex were used during development and documentation, but the scheduling engine itself remains deterministic and explainable.

---

# Technical Skills

## Programming Languages

- C++
- Python
- Java
- JavaScript
- TypeScript
- SQL

## Web & Backend

- React
- Next.js
- Node.js
- Express.js
- FastAPI
- REST APIs

## AI / ML

- Machine Learning
- scikit-learn
- Hugging Face Transformers
- NLP
- LLM evaluation
- local LLM inference
- model benchmarking

## Databases

- PostgreSQL
- MongoDB
- Firebase
- MySQL

## Engineering Tools

- Git
- GitHub
- Linux
- Docker
- GitHub Actions
- Vercel
- Postman
- Vite
- Pytest

## Core Computer Science

- Data Structures & Algorithms
- Object-Oriented Programming
- Operating Systems
- Database Management Systems
- Computer Networks
- Software Engineering
- Concurrency
- Multithreading

---

# Open Source, Competitive Programming & Leadership

## GirlScript Summer of Code 2026

**Role:** Project Admin — CodeFlowViz

- Managed/reviewed **19+ pull requests**.
- Worked across **22+ issues**.
- Reviewed contributor submissions.
- Provided technical feedback.
- Mentored contributors working in the shared CodeFlowViz codebase.

## Competitive Programming

- **CodeChef 3-Star**
- Peak rating: **1614**
- **250+** algorithmic problems solved
- **35+** rated contests
- **Global Rank 86** in CodeChef Starters 240
- Represented KIIT in the **ICPC Asia West Amritapuri 2025 Preliminary Online Contest**

## Smart India Hackathon 2026

- Selected among the **Top 100 teams in KIIT's internal Smart India Hackathon 2026 selection round**.

This refers specifically to KIIT's internal selection round and should not be presented as a national Top-100 ranking.

---

# Professional Direction

My current professional interests are centered around:

- Software Engineering
- Full-Stack Engineering
- Backend Engineering
- Frontend Engineering
- AI/ML Engineering
- Developer Tools
- Optimization Systems
- LLM Applications and Evaluation
- Program Analysis
- Smart-Contract Security
- Data-intensive applications
- Distributed and concurrent backend systems

The common thread across my work is building systems that combine **clear software architecture, practical engineering constraints, data processing, user-facing applications, and technically defensible decision-making**.

---

# Short Professional Bio

**Akash Agarwal** is a third-year B.Tech Computer Science & Engineering student specializing in Artificial Intelligence & Machine Learning at **KIIT, Bhubaneswar**, with a current **CGPA of 8.74/10**. His work spans full-stack engineering, backend systems, AI/ML, developer tooling, optimization and LLM-based research.

He currently works as a **Machine Learning Development Intern at Infiltrix**, where he has built Python/FastAPI inference services and backend API workflows. He also serves as **Technical Lead at the AlgoZenith KIIT Chapter**, where he leads development of the chapter's React/TypeScript/Node.js platform and contributes to code review and competitive-programming initiatives.

His major projects include **CodeFlowViz 2.0**, a JavaScript execution visualization developer tool; **FinVerify AI**, a multi-source financial-claim verification system; **Smart Contract Verification using LLM**, completed during his 8-week LNMIIT LUSIP research internship; the **AlgoZenith KIIT Chapter platform**; and **ReSlot**, a constraint-optimization system that generates academic timetables and performs minimum-disruption timetable recovery using Google OR-Tools CP-SAT.

Alongside development, Akash is active in competitive programming and open source, with a **CodeChef 3-Star peak rating of 1614**, **250+ solved algorithmic problems**, experience as a **GSSoC 2026 Project Admin**, and participation in the **ICPC Asia West Amritapuri 2025 Preliminary Online Contest**.

---

# Public Profiles

- **Portfolio:** https://kauntiaakash2.tech/
- **GitHub:** https://github.com/kauntiaakash2
- **LinkedIn:** https://www.linkedin.com/in/kauntiakash2/
- **CodeFlowViz:** https://github.com/kauntiaakash2/CodeFlowViz-2.0
- **FinVerify AI:** https://github.com/kauntiaakash2/FinVerifyAI
- **ReSlot:** https://github.com/kauntiaakash2/ReSlot
- **AlgoZenith KIIT Chapter:** https://algozenithkiit.codes
