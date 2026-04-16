import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { Flow } from "../../types.js";
import { createTool } from "../helpers.js";

export const listFlows = createTool({
  name: "list_flows",
  description: `List Celigo flows. If integrationId is provided, lists flows for that integration. Otherwise lists all flows with optional pagination.`,
  inputSchema: {
    integrationId: z.string().optional().describe("Filter by integration ID. If omitted, lists all flows."),
    limit: z.number().optional().describe("Maximum number of flows to return"),
    offset: z.number().optional().describe("Number of flows to skip"),
  },
  handler: async ({ integrationId, limit, offset }, context) => {
    let endpoint: string;
    if (integrationId) {
      endpoint = `/integrations/${integrationId}/flows`;
    } else {
      endpoint = '/flows';
    }
    const params: string[] = [];
    if (limit) params.push(`limit=${limit}`);
    if (offset) params.push(`skip=${offset}`);
    if (params.length > 0) endpoint += `?${params.join('&')}`;

    const response = await api.get<Flow[]>(
      endpoint,
      context.accessToken,
      context.region
    );
    return filterCeligoResponse(response.data);
  }
});
