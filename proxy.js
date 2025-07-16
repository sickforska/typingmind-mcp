const http = require('http');
const { spawn } = require('child_process');

console.log('Starting TypingMind MCP Connector...');

// Start the MCP connector
const mcp = spawn('npx', ['@typingmind/mcp@latest', process.env.MCP_AUTH_TOKEN], {
  stdio: 'inherit'
});

// Wait for MCP to start, then create proxy
setTimeout(() => {
  const server = http.createServer((req, res) => {
    const options = {
      hostname: 'localhost',
      port: 50880,
      path: req.url,
      method: req.method,
      headers: req.headers
    };

    const proxy = http.request(options, (mcpRes) => {
      res.writeHead(mcpRes.statusCode, mcpRes.headers);
      mcpRes.pipe(res);
    });

    proxy.on('error', (err) => {
      console.error('Proxy error:', err);
      res.writeHead(502);
      res.end('Bad Gateway');
    });

    req.pipe(proxy);
  });

  const port = process.env.PORT || 10000;
  server.listen(port, '0.0.0.0', () => {
    console.log(`Proxy server running on http://0.0.0.0:${port}`);
  });
}, 3000);
