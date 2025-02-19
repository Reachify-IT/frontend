# Use Node.js Alpine as the base image
FROM node:alpine3.20 as build

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json . 
RUN npm install

# Copy all project files
COPY . .

# Set environment variable for backend API
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

# Expose the Vite development port
EXPOSE 5173

# Start the Vite development server with external access
CMD ["npm", "run", "dev", "--", "--host"]
