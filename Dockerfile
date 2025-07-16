FROM node:18-alpine

WORKDIR /app

# Install the MCP connector
RUN npm install -g @typingmind/mcp@latest

# Copy package files
COPY package*.json ./

# Install dependencies if any
RUN npm install --only=production 2>/dev/null || true

# Expose port
EXPOSE 10000

# Set environment variables
ENV HOST=0.0.0.0
ENV PORT=10000

# Create start script that binds to correct interface
RUN echo '#!/bin/sh\nexec npx @typingmind/mcp@latest "$MCP_AUTH_TOKEN"' > /app/start.sh && chmod +x /app/start.sh

# Start the service
CMD ["/app/start.sh"]
