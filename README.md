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
* [Environment Variables](#environment-variables)
* [One-Command Dev Startup](#-one-command-dev-startup)
* [Run with Docker (manual)](#run-with-docker-manual)
* [Quick Start (No Docker)](#quick-start-no-docker)
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
* Docker Desktop
* PostgreSQL 15+ (only if running locally without Docker)
* Elasticsearch 7.17+ (only if running locally without Docker)
* AWS CLI (optional)

---

## Environment Variables

### `server/.env`

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

### `client/.env`

```env
VITE_API_BASE=http://localhost:5000/api
```

> **Local (non-Docker):** use `PGHOST=localhost` and `ELASTICSEARCH_NODE=http://localhost:9200`.

---

## 🚀 One-Command Dev Startup

We provide a single `npm` command from the **repo root** that:

1. **Stops** any old containers (`docker-compose down`)
2. **Starts** fresh containers in the background (`postgres`, `elasticsearch`)
3. **Waits** for Elasticsearch (and optionally PostgreSQL) to be ready
4. **Launches** backend (`server`) and frontend (`client`) together

### 1) Install root tooling

```bash
cd caseflow-ai
npm install
```

> Ensures `concurrently` is present (devDependency).

### 2) Root `package.json` scripts

Paste the following into the **root** `package.json` under `"scripts"`:

```json
{
  "scripts": {
    "docker:down": "docker-compose down",
    "start:docker": "docker-compose up -d postgres elasticsearch",

    "wait:elastic": "powershell -Command \"Write-Host '⏳ Waiting for Elasticsearch...'; $max=20; $i=0; while ($i -lt $max) { try { $r = Invoke-WebRequest -Uri 'http://localhost:9200' -UseBasicParsing -TimeoutSec 3; if ($r.StatusCode -eq 200) { Write-Host '✅ Elasticsearch is ready!'; exit 0 } } catch { } Start-Sleep -Seconds 2; $i++ } Write-Host '❌ Elasticsearch not ready in time.'; exit 1\"",

    "wait:postgres": "powershell -Command \"Write-Host '⏳ Waiting for PostgreSQL...'; $max=30; $i=0; while ($i -lt $max) { $res = (docker exec postgres pg_isready -U admin -d caseflow 2>$null); if ($LASTEXITCODE -eq 0 -or $res -match 'accepting connections') { Write-Host '✅ PostgreSQL is ready!'; exit 0 } Start-Sleep -Seconds 2; $i++ } Write-Host '❌ PostgreSQL not ready in time.'; exit 1\"",

    "start:server": "npm run wait:elastic && npm run wait:postgres && cd server && npm run dev",
    "start:client": "cd client && npm run dev",

    "start:all": "npm run docker:down && concurrently \"npm run start:docker\" \"npm run start:server\" \"npm run start:client\"",

    "stop:all": "docker-compose down"
  }
}
```

**Notes**

* `start:docker` runs in **detached** mode (`-d`) so your terminal stays focused on app logs.
* `wait:elastic` polls `http://localhost:9200` until the container responds.
* `wait:postgres` uses `docker exec postgres pg_isready …` (assumes the Compose service is named `postgres`). Adjust username/db name if you’ve changed them.

### 3) Start everything

```bash
npm run start:all
```

Access:

* Frontend → [http://localhost:5173](http://localhost:5173)
* Backend → [http://localhost:5000/api](http://localhost:5000/api)
* Elasticsearch → [http://localhost:9200](http://localhost:9200)

### 4) Stop everything

```bash
npm run stop:all
```

This tears down containers. Pressing `Ctrl + C` in the terminal also stops the Node processes started by `concurrently`.

---

## Run with Docker (manual)

If you prefer the manual route:

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

> **Reminder:** Set `PGHOST=localhost` and `ELASTICSEARCH_NODE=http://localhost:9200` when not using Docker.

---

## Default Credentials

| Role  | Email                                         | Password |
| ----- | --------------------------------------------- | -------- |
| Admin | [admin@caseflow.ai](mailto:admin@caseflow.ai) | admin123 |

> Change these credentials in the database or `.env` after the first run for security. The default login is auto-created when seeding or on first backend launch.

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

| Issue                                  | Cause                                  | Fix                                                            |                                                           |
| -------------------------------------- | -------------------------------------- | -------------------------------------------------------------- | --------------------------------------------------------- |
| `Cannot GET /api`                      | Base route placeholder                 | Normal, not an error                                           |                                                           |
| `ECONNREFUSED 127.0.0.1:5432`          | PostgreSQL not ready / wrong host      | Use Docker + `npm run wait:postgres` or set `PGHOST` correctly |                                                           |
| `ConnectionError ... Remote: ::1:9200` | Elasticsearch not ready yet            | Use `npm run wait:elastic` (already in `start:server`)         |                                                           |
| `Error: listen EADDRINUSE :::5000`     | Port already used                      | Kill process: `netstat -ano                                    | findstr :5000`+`taskkill /PID <pid> /F`, or change `PORT` |
| Frontend can’t reach API               | Wrong `VITE_API_BASE` in `client/.env` | Set to `http://localhost:5000/api`                             |                                                           |
| Docker containers won’t start          | Previous run left stale state          | `docker-compose down -v && docker-compose up -d`               |                                                           |
| Node version mismatch / crypto errors  | Old Node                               | Upgrade to **v20.19+**                                         |                                                           |

**Windows Tip:** If PowerShell execution policy blocks scripts, run PowerShell **as Administrator**:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

---

## License

MIT © [Sumaiya Shah](https://github.com/sumaiyashah27)
