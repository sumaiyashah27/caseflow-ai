FROM node:20-alpine

WORKDIR /app

# Copy package files first for caching
COPY package*.json ./

RUN npm install

# Copy all frontend code
COPY . .

# Expose Vite’s port
EXPOSE 5173

# Start Vite dev server (use 0.0.0.0 so Docker can access it)
CMD ["npm", "run", "dev", "--", "--host"]
