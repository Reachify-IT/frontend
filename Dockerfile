# Build Stage
FROM node:alpine3.18 AS build

# Declare build-time environment variables
ARG VITE_BackendURL

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (Better Docker caching)
COPY package.json .
RUN npm install

# Copy the full project source code
COPY . .

# Build the frontend
RUN npm run build

# Serve with Nginx
FROM nginx:1.23-alpine

RUN mkdir -p /usr/share/nginx/html && rm -rf /usr/share/nginx/html/*



# Copy built frontend files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
ENTRYPOINT ["nginx", "-g", "daemon off;"]
