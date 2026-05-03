# Stage 1: Build the Vite React application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the application
COPY . .

# Build the application
# Ensure VITE_GEMINI_API_KEY is available during the build if required.
# In Vite, env variables used in source code are replaced at build time.
# For Cloud Run, you should use Cloud Build triggers to inject this securely.
ARG VITE_GEMINI_API_KEY
ENV VITE_GEMINI_API_KEY=$VITE_GEMINI_API_KEY

RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built assets from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 8080 (Cloud Run expects apps to listen on 8080 by default)
EXPOSE 8080

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
