import { z } from "zod";
import { api } from "../../api.js";
import { Integration } from "../../types.js";
import { createTool } from "../helpers.js";

export const updateIntegration = createTool({
  name: "update_integration",
  description: "Update an existing Celigo integration",
  inputSchema: {
    integrationId: z.string().describe("The ID of the integration to update"),
    name: z.string().optional().describe("New name for the integration"),
    config: z.record(z.any()).optional().describe("Updated integration configuration"),
  },
  handler: async ({ integrationId, name, config }, context) => {
    const updateData: any = {};
    if (name) updateData.name = name;
    if (config) Object.assign(updateData, config);

    const response = await api.put<Integration>(
      `/integrations/${integrationId}`,
      context.accessToken,
      context.region,
      updateData
    );
    return response.data;
  }
});

