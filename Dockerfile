# Stage 1: Build the React App
FROM node:alpine3.20 AS build

WORKDIR /app

# Install dependencies
COPY package*.json . 
RUN npm ci

# Copy all project files and build
COPY . .
ARG VITE_BackendURL
ENV VITE_BackendURL=$VITE_BackendURL
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:1.23-alpine

# Clean default Nginx static assets and configuration
WORKDIR /usr/share/nginx/html
RUN rm -rf /usr/share/nginx/html/* \
    && rm /etc/nginx/conf.d/default.conf

# Copy build files and custom Nginx configuration
COPY --from=build /app/dist .
COPY default.conf /etc/nginx/conf.d/

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
