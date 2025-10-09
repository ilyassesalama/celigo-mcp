import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { Flow } from "../../types.js";
import { createTool } from "../helpers.js";

export const listFlows = createTool({
  name: "list_flows",
  description: "List flows for a specific integration",
  inputSchema: {
    integrationId: z.string().describe("The ID of the integration"),
  },
  handler: async ({ integrationId }, context) => {
    const response = await api.get<Flow[]>(
      `/integrations/${integrationId}/flows`,
      context.accessToken,
      context.region
    );
    return filterCeligoResponse(response.data);
  }
});

