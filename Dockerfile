# Use an official Node.js runtime as a parent image (slim variant for better security)
FROM node:23-slim

# Set the working directory in the container
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml first to leverage Docker cache
COPY package.json pnpm-lock.yaml ./

# Install only production dependencies
RUN pnpm install --prod

# Copy the rest of the application source code
COPY . .

# Set the default port the app will run on
ENV PORT=12757

# Make port 12757 available to the world outside this container
EXPOSE 12757

# Define the command to run the app
CMD ["node", "bin/index.js"]
