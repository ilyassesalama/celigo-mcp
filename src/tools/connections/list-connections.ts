import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { Connection } from "../../types.js";
import { createTool } from "../helpers.js";

export const listConnections = createTool({
  name: "list_connections",
  description: "List all Celigo connections",
  inputSchema: {
    type: z.string().optional().describe("Filter by connection type (e.g., 'http', 'netsuite', 'salesforce')"),
    limit: z.number().optional().describe("Maximum number of connections to return"),
    offset: z.number().optional().describe("Number of connections to skip"),
  },
  handler: async ({ type, limit, offset }, context) => {
    let endpoint = '/connections';
    const params = [];
    if (type) params.push(`type=${type}`);
    if (limit) params.push(`limit=${limit}`);
    if (offset) params.push(`skip=${offset}`);
    if (params.length > 0) endpoint += `?${params.join('&')}`;

    const response = await api.get<Connection[]>(endpoint, context.accessToken, context.region);
    return filterCeligoResponse(response.data);
  }
});

