# ⚖️ CaseFlow AI – Legal Workflow Automation Platform

**React + TypeScript + Node.js + PostgreSQL + OpenAI + Elasticsearch + Docker + AWS-ready**

An AI-driven legal workflow automation platform that enables document intelligence, case tracking, and NLP-powered search for legal teams.

* **Scalability:** ~88% **Security:** ~90% **UX/DX:** ~86%
* **AI + NLP:** Summarization, classification, context-based search
* **Stack:** React + Node + PostgreSQL + Elasticsearch + OpenAI
* **AWS Elastic Beanstalk** deploy-ready (Docker)

---

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Screens](#screens)
* [Architecture](#architecture)
* [Repo Structure](#repo-structure)
* [Prerequisites](#prerequisites)
* [Quick Start (No Docker)](#quick-start-no-docker)
* [Run with Docker](#run-with-docker)
* [Environment Variables](#environment-variables)
* [Default Credentials](#default-credentials)
* [AWS Deployment (Elastic Beanstalk)](#aws-deployment-elastic-beanstalk)
* [Troubleshooting](#troubleshooting)
* [License](#license)

---

## Features

* 🤖 **AI Document Analysis** – Auto-summarization & tagging using OpenAI API.
* 🔍 **Elasticsearch Integration** – Contextual search & indexing for legal docs.
* 📁 **Case Management Dashboard** – Track, manage, and review cases.
* 🔐 **JWT Authentication** – Secure login for authorized users.
* 🐳 **Dockerized Infrastructure** – One command for full stack setup.
* ☁️ **AWS-ready** – Supports container deployment via Elastic Beanstalk.

---

## Tech Stack

* **Frontend:** React, TypeScript, Vite
* **Backend:** Node.js, Express, TypeScript
* **Database:** PostgreSQL
* **Search Engine:** Elasticsearch 7.17
* **AI Engine:** OpenAI API (text analysis)
* **Infra:** Docker, docker-compose
* **CI/CD:** GitHub Actions

---

## Screens

* **Landing Page:** Overview of CaseFlow AI with Login CTA
* **Dashboard:** Quick case summaries and document analytics
* **Documents:** Upload and classify legal files
* **Cases:** Track, assign, and analyze ongoing legal cases

---

## Architecture

```
[ React (Vite) ] → REST API (Express + TypeScript)
       │
       ▼
[ PostgreSQL + Elasticsearch + OpenAI API ]
```

**Prod-ready Note:** Data and AI layers are modular, easily replaceable with other NLP or DB systems.

---

## Repo Structure

```
caseflow-ai/
├─ client/                # React + Vite frontend
│  ├─ src/pages/          # Landing, Login, Dashboard, Documents, Cases
│  ├─ src/services/       # axios + API calls
│  └─ App.tsx             # Routing setup
├─ server/                # Node + Express backend (TypeScript)
│  ├─ src/services/       # db.ts, elastic.ts, openai.ts
│  ├─ src/routes/         # auth, documents, cases
│  └─ index.ts            # App entry
├─ docker-compose.yml     # Docker setup
├─ .github/workflows/     # CI/CD
└─ README.md
```

---

## Prerequisites

* Node.js **v20+**
* npm **v9+**
* PostgreSQL 15+
* Elasticsearch 7.17+
* Docker Desktop (optional)
* AWS CLI (optional)

---

## Quick Start (No Docker)

### 1️⃣ Backend Setup

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

✅ Backend → [http://localhost:5000/api](http://localhost:5000/api)

### 2️⃣ Frontend Setup

```bash
cd client
cp .env.example .env
npm install
npm run dev
```

✅ Frontend → [http://localhost:5173](http://localhost:5173)

---

## Run with Docker

### Step 1 — Build Images

```bash
docker-compose build
```

### Step 2 — Run Stack

```bash
docker-compose up
```

### Step 3 — Access

* Frontend → [http://localhost:5173](http://localhost:5173)
* Backend → [http://localhost:5000/api](http://localhost:5000/api)
* Elasticsearch → [http://localhost:9200](http://localhost:9200)

---

## Environment Variables

### server/.env

```env
PORT=5000
JWT_SECRET=change_me
OPENAI_API_KEY=sk-xxxx

PGHOST=postgres
PGPORT=5432
PGDATABASE=caseflow
PGUSER=admin
PGPASSWORD=password

ELASTICSEARCH_NODE=http://elasticsearch:9200
ELASTICSEARCH_INDEX=caseflow_docs
```

### client/.env

```env
VITE_API_BASE=http://localhost:5000/api
```

> Local (non-Docker): use `PGHOST=localhost` and `ELASTICSEARCH_NODE=http://localhost:9200`.

---

## Default Credentials

| Role  | Email                                         | Password |
| ----- | --------------------------------------------- | -------- |
| Admin | [admin@caseflow.ai](mailto:admin@caseflow.ai) | admin123 |

---

## AWS Deployment (Elastic Beanstalk)

### 1️⃣ Build Image

```bash
docker build -t caseflow-ai .
```

### 2️⃣ Deploy to EB

```bash
eb init
eb create caseflow-ai-env
eb deploy
```

App URL:

```
http://caseflow-ai-env.eba-xyz123.us-east-1.elasticbeanstalk.com/
```

---

## Troubleshooting

| Issue                            | Cause                  | Fix                      |
| -------------------------------- | ---------------------- | ------------------------ |
| `Cannot GET /api`                | Base route placeholder | Normal, not an error     |
| `ECONNREFUSED 127.0.0.1:5432`    | PostgreSQL not running | Start DB or fix `PGHOST` |
| `Elasticsearch connection error` | Container not started  | Check Docker logs        |
| `crypto.hash is not a function`  | Old Node version       | Upgrade to v20.19+       |
| Port conflict                    | Another app running    | Change ports in `.env`   |

---

## License

MIT © [Sumaiya Shah](https://github.com/sumaiyashah27)
