import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const listExports = createTool({
  name: "list_exports",
  description: `List export configurations with filtering and pagination.

Supports filtering by:
- Type (e.g., "HTTPExport", "NetSuiteExport", "SalesforceExport")
- Connection ID
- Name (partial match)

Returns filtered results with optional pagination for better performance.`,
  inputSchema: {
    limit: z.number().optional().describe("Maximum number of exports to return (default: 10)"),
    offset: z.number().optional().describe("Number of exports to skip (default: 0)"),
    type: z.string().optional().describe("Filter by export type (e.g., 'HTTPExport', 'NetSuiteExport', 'SalesforceExport')"),
    connectionId: z.string().optional().describe("Filter by connection ID"),
    name: z.string().optional().describe("Filter by name (partial match)"),
  },
  handler: async ({ limit, offset, type, connectionId, name }, context) => {
    let endpoint = '/exports';
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

