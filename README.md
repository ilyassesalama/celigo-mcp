# Celigo MCP Server

[![npm version](https://badge.fury.io/js/celigo-mcp.svg)](https://www.npmjs.com/package/celigo-mcp)

A Model Context Protocol (MCP) server for the Celigo integrator.io API. This server allows Claude and other MCP clients to interact with Celigo integrations, flows, connections, and more.

## Usage

Add this configuration to your MCP client config file:

```json
{
  "mcpServers": {
    "celigo-mcp": {
      "command": "npx",
      "args": [
        "-y",
        "celigo-mcp@latest",
        "--access-token",
        "<your-celigo-api-token>",
        "--region",
        "NA"
      ]
    }
  }
}
```

### Command Line Arguments

- `--access-token` (required): Your Celigo API access token
- `--region` (optional): API region, either `NA` (North America, default) or `EU` (Europe)

## Available Tools

### Token Validation

- `validate_token` - Validate the Celigo API token and get user information

### Integration Management

- `list_integrations` - List all Celigo integrations
- `get_integration` - Get a specific integration by ID
- `create_integration` - Create a new integration
- `update_integration` - Update an existing integration
- `delete_integration` - Delete an integration

### Flow Management

- `list_flows` - List flows for a specific integration
- `get_flow` - Get a specific flow by ID
- `run_flow` - Run a specific flow

### Connection Management

- `list_connections` - List all connections (with optional type filter)
- `get_connection` - Get a specific connection by ID
- `create_connection` - Create a new connection
- `update_connection` - Update an existing connection
- `delete_connection` - Delete a connection

### Export Management

- `list_exports` - List all export configurations
- `get_export` - Get a specific export configuration by ID

### Import Management

- `list_imports` - List all import configurations
- `get_import` - Get a specific import configuration by ID

## Example Usage with Claude

Once configured, you can ask Claude to:

- "List all my Celigo integrations"
- "Show me the flows for integration [integration-id]"
- "Create a new HTTP connection named 'My API Connection'"
- "Run the flow with ID [flow-id]"
- "Get details about connection [connection-id]"

## Getting Your Celigo API Token

1. Log in to your Celigo account
2. Go to Settings > API Tokens
3. Create a new API token with appropriate permissions
4. Copy the token and use it with the `--access-token` argument

## Region Selection

Celigo operates in two regions:

- `NA` (North America) - api.integrator.io
- `EU` (Europe) - api.eu.integrator.io

Make sure to select the correct region for your Celigo account.

## Development

### Building from Source

```bash
git clone https://github.com/ilyassesalama/celigo-mcp.git
cd celigo-mcp
npm install
npm run build
```

### Testing Locally

```bash
node build/index.js --access-token <your-token> --region NA
```

## License

MIT

## Support

For issues and questions, please visit the [GitHub repository](https://github.com/ilyassesalama/celigo-mcp).
