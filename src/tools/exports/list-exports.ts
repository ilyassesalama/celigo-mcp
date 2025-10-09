import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const listExports = createTool({
  name: "list_exports",
  description: "List all export configurations",
  inputSchema: {
    limit: z.number().optional().describe("Maximum number of exports to return"),
    offset: z.number().optional().describe("Number of exports to skip"),
  },
  handler: async ({ limit, offset }, context) => {
    let endpoint = '/exports';
    const params = [];
    if (limit) params.push(`limit=${limit}`);
    if (offset) params.push(`skip=${offset}`);
    if (params.length > 0) endpoint += `?${params.join('&')}`;

    const response = await api.get(endpoint, context.accessToken, context.region);
    return filterCeligoResponse(response.data);
  }
});

