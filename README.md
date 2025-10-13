# Celigo MCP Server

[![npm version](https://badge.fury.io/js/celigo-mcp.svg)](https://www.npmjs.com/package/celigo-mcp)

A Model Context Protocol (MCP) server for the Celigo integrator.io API. This server allows ChatGPT, Claude, Cursor, and other MCP clients to interact with Celigo integrations, flows, connections, and more.

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
- `create_flow` - Create a new flow
- `update_flow` - Update an existing flow
- `clone_flow` - Clone an existing flow
- `run_flow` - Run a specific flow
- `get_flow_errors` - Get errors for a specific flow
- `get_flow_audit` - Get audit history for a flow
- `get_flow_dependencies` - Get dependencies for a flow
- `get_flow_jobs` - Get job history for a flow
- `delete_flow` - Delete a flow

### Connection Management

- `list_connections` - List all connections (with optional type filter)
- `get_connection` - Get a specific connection by ID
- `create_connection` - Create a new connection
- `update_connection` - Update an existing connection
- `delete_connection` - Delete a connection

### Export Management

- `list_exports` - List all export configurations
- `get_export` - Get a specific export configuration by ID
- `create_export` - Create a new export configuration
- `update_export` - Update an existing export configuration
- `delete_export` - Delete an export configuration

### Import Management

- `list_imports` - List all import configurations
- `get_import` - Get a specific import configuration by ID
- `create_import` - Create a new import configuration
- `update_import` - Update an existing import configuration
- `delete_import` - Delete an import configuration

## Example Usage

Once configured, you can ask ChatGPT, Claude, Cursor, and other MCP clients to:

- "List all my Celigo integrations"
- "Show me the flows for integration [integration-id]"
- "Create a new flow for integration [integration-id]"
- "Clone flow [flow-id] and name it 'New Flow'"
- "Show me recent errors for flow [flow-id]"
- "Get job history for flow [flow-id]"
- "Create a new HTTP connection named 'My API Connection'"
- "Update connection [connection-id] with new settings"
- "Run the flow with ID [flow-id]"
- "Get details about connection [connection-id]"
- "Create a new export configuration"
- "Show me the audit history for flow [flow-id]"

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
