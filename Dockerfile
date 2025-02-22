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

# Use a lightweight HTTP server to serve the React app
FROM node:alpine3.20

# Set working directory
WORKDIR /app

# Copy build files
COPY --from=build /app/dist .


# # Clean default Nginx static assets and configuration
# WORKDIR /usr/share/nginx/html
# RUN rm -rf /usr/share/nginx/html/* \
#     && rm -f /etc/nginx/conf.d/default.conf


# Install http-server globally
RUN npm install -g http-server

EXPOSE 80
CMD ["http-server", "-p", "80"]




# # Copy build files and custom Nginx configuration
# # COPY --from=build /app/dist .
# # COPY default.conf /etc/nginx/conf.d/

# EXPOSE 80
# ENTRYPOINT ["nginx", "-g", "daemon off;"]
