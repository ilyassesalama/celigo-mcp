#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerAllTools } from './tools/index.js';
import { CeligoRegion } from './types.js';

// Parse command line arguments
const args = process.argv.slice(2);
let accessToken = '';
let region = CeligoRegion.NA;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--access-token' && args[i + 1]) {
    accessToken = args[i + 1];
    i++;
  } else if (args[i] === '--region' && args[i + 1]) {
    const regionArg = args[i + 1].toUpperCase();
    if (regionArg === 'NA' || regionArg === 'EU') {
      region = regionArg as CeligoRegion;
    }
    i++;
  }
}

if (!accessToken) {
  console.error('Error: --access-token is required');
  process.exit(1);
}

// Create server instance
const server = new McpServer({
  name: "celigo",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

// Register all tools
registerAllTools({
  server,
  accessToken,
  region,
});

// Run the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Celigo MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});

