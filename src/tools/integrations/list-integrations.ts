import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { Integration } from "../../types.js";
import { createTool } from "../helpers.js";

export const listIntegrations = createTool({
  name: "list_integrations",
  description: "List all Celigo integrations",
  inputSchema: {
    limit: z.number().optional().describe("Maximum number of integrations to return"),
    offset: z.number().optional().describe("Number of integrations to skip"),
  },
  handler: async ({ limit, offset }, context) => {
    let endpoint = '/integrations';
    const params = [];
    if (limit) params.push(`limit=${limit}`);
    if (offset) params.push(`skip=${offset}`);
    if (params.length > 0) endpoint += `?${params.join('&')}`;

    const response = await api.get<Integration[]>(endpoint, context.accessToken, context.region);
    return filterCeligoResponse(response.data);
  }
});

