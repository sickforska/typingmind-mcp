#!/usr/bin/env node

const server = require('../lib/server');
const chalk = require('chalk');

// Get auth token from command line arguments
const authToken = process.argv[2];

if (!authToken) {
  console.error(chalk.red('Error: Authentication token is required'));
  console.log('Usage: npx @typingmind/mcp <auth-token>');
  process.exit(1);
}

// Start the server with the provided auth token
server
  .start(authToken)
  .then(({ host, port }) => {
    console.log(
      chalk.green(`✓ MCP runner server running on http://${host}:${port}`),
    );
    console.log(
      chalk.yellow(
        'Note: You must keep the server running in the background in order to use MCP in TypingMind.',
      ),
    );
  })
  .catch((err) => {
    console.error(chalk.red(`Error starting MCP server: ${err.message}`));
    process.exit(1);
  });
