# Model Context Protocol (MCP) Runner

A lightweight server that runs other MCP servers for TypingMind. This package allows you to run a local server that communicates with the TypingMind API using the MCP.

## Installation

You can run this package directly using npx:

```bash
npx @typingmind/mcp <auth-token>
```

## Requirements

- Node.js 14 or later
- An internet connection
- One of the following ports available: 50880 to 50889

## Usage

1. Run the command provided by TypingMind:
   ```bash
   npx @typingmind/mcp <auth-token>
   ```

2. Keep the server running in the background while using TypingMind.

3. The MCP server will be available at `http://localhost:<port>` where port is one of: 12757, 12758, 12759.

## API Endpoints

- `/ping` - Check if the server is running
- `/hello` - Test endpoint for connection

All endpoints require authentication with the Bearer token provided when starting the server.

## License

MIT
