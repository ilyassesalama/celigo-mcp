import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const listImports = createTool({
  name: "list_imports",
  description: `List import configurations with filtering and pagination.

Supports filtering by:
- Type (e.g., "HTTPImport", "NetSuiteImport", "SalesforceImport")
- Connection ID
- Name (partial match)

Returns filtered results with optional pagination for better performance.`,
  inputSchema: {
    limit: z.number().optional().describe("Maximum number of imports to return (default: 10)"),
    offset: z.number().optional().describe("Number of imports to skip (default: 0)"),
    type: z.string().optional().describe("Filter by import type (e.g., 'HTTPImport', 'NetSuiteImport', 'SalesforceImport')"),
    connectionId: z.string().optional().describe("Filter by connection ID"),
    name: z.string().optional().describe("Filter by name (partial match)"),
  },
  handler: async ({ limit, offset, type, connectionId, name }, context) => {
    let endpoint = '/imports';
    const params = [];
    if (limit) params.push(`limit=${limit}`);
    if (offset) params.push(`skip=${offset}`);
    if (type) params.push(`adaptorType=${type}`);
    if (connectionId) params.push(`_connectionId=${connectionId}`);
    if (name) params.push(`name=${encodeURIComponent(name)}`);
    if (params.length > 0) endpoint += `?${params.join('&')}`;

    const response = await api.get(endpoint, context.accessToken, context.region);
    return filterCeligoResponse(response.data);
  }
});

