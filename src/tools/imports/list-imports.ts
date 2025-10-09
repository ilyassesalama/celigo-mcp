import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const listImports = createTool({
  name: "list_imports",
  description: "List all import configurations",
  inputSchema: {
    limit: z.number().optional().describe("Maximum number of imports to return"),
    offset: z.number().optional().describe("Number of imports to skip"),
  },
  handler: async ({ limit, offset }, context) => {
    let endpoint = '/imports';
    const params = [];
    if (limit) params.push(`limit=${limit}`);
    if (offset) params.push(`skip=${offset}`);
    if (params.length > 0) endpoint += `?${params.join('&')}`;

    const response = await api.get(endpoint, context.accessToken, context.region);
    return filterCeligoResponse(response.data);
  }
});

