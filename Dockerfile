# Use Node.js Alpine as the base image
FROM node:alpine3.20 as build

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json . 
RUN npm install

# Copy all project files and build
COPY . .
ARG VITE_BackendURL
ENV VITE_BackendURL=${VITE_BackendURL}
RUN npm run build

# Serve with Nginx
FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=build /app/dist .

# Copy Nginx configuration
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
