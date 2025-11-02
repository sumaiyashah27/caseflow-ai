# ⚖️ CaseFlow AI – Legal Workflow Automation Platform

**Full Stack:** React + TypeScript + Node.js + PostgreSQL + Elasticsearch + OpenAI + Docker + AWS-ready

CaseFlow AI is an intelligent legal workflow automation system designed to help law firms and legal teams analyze, organize, and manage case documents using AI-powered insights.

---

## 🚀 Overview

**CaseFlow AI** combines natural language processing, document analytics, and data management to streamline legal case workflows. It can summarize documents, extract entities, and classify legal materials such as contracts, motions, and memos — all while offering scalable infrastructure.

**Key Capabilities:**

* 🤖 AI-driven document analysis using OpenAI
* 🔍 Advanced search via Elasticsearch
* 🧩 Full CRUD case management backend
* 🔐 Secure authentication with JWT
* 🐳 Dockerized, modular, and AWS-ready
* 🧠 Clean local dev flow with one command (`npm run start:all`)

---

## 🏗️ Architecture

```
[ React (Vite) ] → REST API (Express + TypeScript)
        │
        ▼
[ PostgreSQL + Elasticsearch + OpenAI API ]
```

Backend handles authentication, AI requests, and database/search integration.
Frontend provides the dashboard and document management interface.

---

## 🧰 Tech Stack

| Layer         | Technology                                    |
| ------------- | --------------------------------------------- |
| **Frontend**  | React, TypeScript, Vite                       |
| **Backend**   | Node.js, Express, TypeScript                  |
| **Database**  | PostgreSQL 15                                 |
| **Search**    | Elasticsearch 7.17                            |
| **AI Engine** | OpenAI GPT models                             |
| **Infra**     | Docker, Docker Compose, AWS Elastic Beanstalk |
| **CI/CD**     | GitHub Actions                                |

---

## 🧩 Folder Structure

```
caseflow-ai/
├─ client/                  # Frontend (React + Vite)
│  ├─ src/pages/            # Pages: Dashboard, Cases, Documents
│  ├─ src/services/         # API integration (axios)
│  └─ App.tsx               # Router setup
│
├─ server/                  # Backend (Node + Express + TS)
│  ├─ src/routes/           # Routes: auth, documents, cases
│  ├─ src/services/         # Services: db, elastic, openai
│  └─ index.ts              # Entry point
│
├─ docker-compose.yml       # Docker configuration
├─ .github/workflows/       # CI/CD setup
└─ README.md
```

---

## ⚙️ Prerequisites

* Node.js **v20+**
* npm **v9+**
* Docker Desktop
* PostgreSQL 15+ (optional for local only)
* Elasticsearch 7.17+ (optional for local only)

---

## 🔐 Environment Variables

### `server/.env`

```env
PORT=5000
JWT_SECRET=your_secret_here
OPENAI_API_KEY=sk-xxxxx
OPENAI_BASE_URL=https://api.openai.com/v1

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

> For **non-Docker** local runs, replace `PGHOST=localhost` and `ELASTICSEARCH_NODE=http://localhost:9200`.

---

## 🧠 How to Run the Project

To start the complete stack (databases in Docker, app locally):

### Command

```bash
npm run start:all
```

### What it does:

1. Stops any running containers
2. Starts PostgreSQL & Elasticsearch in Docker
3. Waits for both to become healthy
4. Launches backend (`server`) and frontend (`client`) locally

### Access URLs

* Frontend → [http://localhost:5173](http://localhost:5173)
* Backend → [http://localhost:5000/api](http://localhost:5000/api)
* Elasticsearch → [http://localhost:9200](http://localhost:9200)

✅ No OpenAI 429 quota errors — backend uses host IP automatically.

---

## ⚡ Quick Start (No Docker)

If you prefer a fully local setup:

### Backend

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

### Frontend

```bash
cd client
cp .env.example .env
npm install
npm run dev
```

Access:

* Backend → [http://localhost:5000/api](http://localhost:5000/api)
* Frontend → [http://localhost:5173](http://localhost:5173)

---

## 👤 Default Credentials

| Role  | Email                                         | Password |
| ----- | --------------------------------------------- | -------- |
| Admin | [admin@caseflow.ai](mailto:admin@caseflow.ai) | admin123 |

> Change credentials after first launch for security. Admin account is auto-created during seeding.

---

## ☁️ AWS Deployment (Elastic Beanstalk)

### Build & Deploy

```bash
docker build -t caseflow-ai .
eb init
eb create caseflow-ai-env
eb deploy
```

Your app will be available at:

```
http://caseflow-ai-env.eba-xyz123.us-east-1.elasticbeanstalk.com/
```

---

## 🧩 Troubleshooting

| Issue                                        | Cause                                      | Fix                                            |
| -------------------------------------------- | ------------------------------------------ | ---------------------------------------------- |
| `Error: 429 You exceeded your current quota` | Docker’s shared network IP is rate-limited | Use `npm run start:all` (runs backend locally) |
| `ECONNREFUSED 127.0.0.1:5432`                | PostgreSQL not ready                       | Wait or rerun `npm run wait:postgres`          |
| `Cannot GET /api`                            | Base route placeholder                     | Safe to ignore                                 |

---

## 🪪 License

MIT © [Sumaiya Shah](https://github.com/sumaiyashah27)
