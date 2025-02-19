# Use Node.js Alpine as the base image
FROM node:alpine3.20 as build

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json . 
RUN npm install

# Copy all project files
COPY . .

# Expose the Vite development port
EXPOSE 5173

# Start the Vite development server with external access
CMD ["npm", "run", "dev", "--", "--host"]
