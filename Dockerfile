# Use Node.js Alpine as the base image for building
FROM node:18-alpine3.20 as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if present) to leverage caching
COPY package*.json . 

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Set environment variable for backend API
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_BackendURL}

# Build the Vite React app
RUN npm run build

# Use Nginx to serve the build
FROM nginx:1.23-alpine

# Copy the built files from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
ENTRYPOINT ["nginx", "-g", "daemon off;"]
