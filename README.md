# Celigo MCP Server

[![npm version](https://img.shields.io/npm/v/@ilyassesalama/celigo-mcp.svg)](https://www.npmjs.com/package/@ilyassesalama/celigo-mcp)

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
        "@ilyassesalama/celigo-mcp@latest",
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

**117 tools across 15 categories**, mapped 1:1 to Celigo's [Standard REST API](https://docs.celigo.com/hc/en-us/sections/360007476271-Standard-REST-API).

### Token

- `validate_token` — Validate the access token and return the associated userId

### Integrations

- `list_integrations`, `get_integration`, `create_integration`, `update_integration`, `patch_integration`, `delete_integration`
- `clone_integration` — Clone an integration with all its flows
- `create_integration_revision` — Snapshot the current integration state (supports `ignoreIfNoChanges`)
- `get_integration_audit` — Change history for an integration
- `get_integration_connections` / `get_integration_exports` / `get_integration_imports` / `get_integration_users` — List children
- `get_integration_errors` — Open error summary across all flows
- `get_integration_dependencies` — Resources referencing the integration
- `get_integration_template` — Download the integration as a reusable template

### Flows

- `list_flows`, `get_flow`, `create_flow`, `update_flow`, `patch_flow`, `delete_flow`
- `clone_flow` — Clone a flow with connection remapping
- `run_flow` — Trigger an on-demand execution
- `get_flow_audit` / `get_flow_dependencies` / `get_flow_descendants` — Metadata
- `get_flow_jobs` — Latest execution jobs
- `get_flow_last_export_datetime` — Timestamp of last export run
- `get_flow_template` — Download the flow as a template
- `get_flow_errors` — Open errors for an export/import in the flow
- `get_resolved_errors` / `delete_resolved_errors` — Resolved error history
- `resolve_errors` / `retry_errors` — Resolve or retry specific errors
- `assign_export_error` — Assign errors to a user
- `update_flow_error_tags` — Tag errors for triage

### Connections

- `list_connections`, `get_connection`, `create_connection`, `update_connection`, `patch_connection`, `delete_connection`
- `ping_connection` — Test an existing connection
- `test_virtual_connection` — Test a connection config without saving it
- `get_connection_audit` / `get_connection_dependencies` / `get_connection_debug_logs`
- `register_connection` / `unregister_connection` / `register_connections_bulk` — Link/unlink connections to integrations

### Exports

- `list_exports`, `get_export`, `create_export`, `update_export`, `patch_export`, `delete_export`
- `clone_export` — Clone an export with connection remapping
- `get_export_audit` — Change history
- `execute_virtual_export` — Run an ad-hoc export without saving
- `export_virtual_paged` — Paginated ad-hoc export

### Imports

- `list_imports`, `get_import`, `create_import`, `update_import`, `patch_import`, `delete_import`
- `clone_import` — Clone an import with connection remapping
- `invoke_import` — Trigger a manual import execution
- `get_import_audit` / `get_import_dependencies`
- `execute_virtual_import` / `evaluate_virtual_import_map` — Ad-hoc import & mapping preview

### Scripts

- `create_script`, `get_script`, `update_script`, `delete_script`
- `get_script_logs` — Execution logs for a script

### Tags

- `list_tags`, `get_tag`, `create_tag`, `update_tag`, `delete_tag`

### Users

- `list_users`, `get_user`, `update_user`, `delete_user`
- `invite_user`, `invite_multiple_users` — Invite user(s) to the account

### iClients

- `list_iclients`, `get_iclient`, `create_iclient`, `update_iclient`, `delete_iclient`

### State (global + resource-scoped)

- `list_state_keys`, `get_state_value`, `upsert_state_value`, `delete_state_value`, `delete_all_state` — Integration-scoped state
- `list_resource_state`, `get_resource_state_value`, `upsert_resource_state_value`, `delete_resource_state_value`, `delete_all_resource_state` — State scoped to a specific resource (export/import/connection/flow/integration)

### File Definitions

- `list_file_definitions`, `get_file_definition`, `create_file_definition`, `delete_file_definition`

### Data Parsing & Generation

- `parse_csv_to_json`, `parse_xml_to_json`
- `parse_structured_file` — Parse delimited/fixed-width files against a file definition
- `generate_structured_file` — Generate delimited/fixed-width output from JSON

### Miscellaneous

- `list_jobs` — List flow/integration jobs with rich filters
- `list_audit_logs` — Account-wide audit trail
- `list_licenses` — SmartConnector licenses
- `get_edi_profiles` — List EDI profiles

## Example Usage

Once configured, you can ask ChatGPT, Claude, Cursor, and other MCP clients to:

- "List all my Celigo integrations"
- "Show me the open errors for integration [integration-id]"
- "Retry errors for export [export-id] in flow [flow-id]"
- "Resolve all errors for import [import-id] in flow [flow-id]"
- "Create a snapshot of integration [integration-id]"
- "Clone flow [flow-id] with connection map `{oldId: newId}`"
- "Ping connection [connection-id] to check if it's operational"
- "Test a virtual HTTP connection before saving it"
- "Parse this CSV data to JSON"
- "Generate a delimited file from these records using file definition [id]"
- "Invite user@example.com as an administrator"
- "Set integration state key `lastRun` to `2026-04-17T00:00:00Z`"

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
