#!/bin/bash
# ==========================================================
# CaseFlow AI - AWS EC2 Deployment Script
# Author: Sumaiya
# Description: One-click deployment for AWS EC2 or Cloud VM
# ==========================================================

set -e

echo "🚀 Starting CaseFlow AI AWS Deployment"

# 1️⃣ Update server packages
sudo apt update -y
sudo apt install -y docker.io docker-compose git curl

sudo systemctl enable docker
sudo systemctl start docker

# 2️⃣ Clone or pull the latest code
if [ ! -d "caseflow-ai" ]; then
  echo "📦 Cloning project..."
  git clone https://github.com/<your-github-username>/caseflow-ai.git
  cd caseflow-ai
else
  echo "🔄 Updating existing project..."
  cd caseflow-ai
  git pull
fi

# 3️⃣ Check .env or create a default one
if [ ! -f ".env" ]; then
  echo "⚙️ Creating default .env file..."
  cat <<EOF > .env
PORT=5000
JWT_SECRET=4919b6f9c3a880ae289712edf7bcb3f69b51c868d5260a33b645e898823c6d57e0638d322e3ed7481b9dec186393a354d77078a4a710180daeaafa0216014025
OPENAI_API_KEY=your_openai_api_key_here

PGHOST=postgres
PGPORT=5432
PGDATABASE=caseflow
PGUSER=admin
PGPASSWORD=password

ELASTICSEARCH_NODE=http://elasticsearch:9200
ELASTICSEARCH_INDEX=caseflow_docs

VITE_API_BASE=http://localhost:5000/api
EOF
fi

# 4️⃣ Build and run the containers
sudo docker-compose down -v
sudo docker-compose build
sudo docker-compose up -d

# 5️⃣ Done ✅
PUBLIC_IP=$(curl -s ifconfig.me)
echo "=========================================================="
echo "✅ CaseFlow AI deployed successfully on AWS EC2"
echo "🌐 Frontend:  http://$PUBLIC_IP:5173"
echo "⚙️ Backend:   http://$PUBLIC_IP:5000/api"
echo "🧠 Elasticsearch: http://$PUBLIC_IP:9200"
echo "=========================================================="
