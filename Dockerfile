# Use Node.js for building the app
FROM node:alpine3.18 AS build

# Declare build time environment variables
ARG VITE_BackendURL
ENV VITE_BackendURL=$VITE_BackendURL

# Set working directory and install dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app and build it
COPY . .
RUN npm run build

# Use Nginx for serving the built app
FROM nginx:1.23-alpine

# Set working directory
WORKDIR /usr/share/nginx/html

# Remove default nginx files
RUN rm -rf ./*

# Copy built React files from previous stage
COPY --from=build /app/dist . 

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
ENTRYPOINT ["nginx", "-g", "daemon off;"]
