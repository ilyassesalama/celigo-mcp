import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const listResourceState = createTool({
  name: "list_resource_state",
  description: "List all state keys for a specific resource within an integration.",
  inputSchema: {
    integrationId: z.string().describe("The ID of the integration"),
    resourceType: z.string().describe("Resource type (e.g., 'exports', 'imports', 'connections')"),
    resourceId: z.string().describe("The ID of the resource"),
  },
  handler: async ({ integrationId, resourceType, resourceId }, context) => {
    const response = await api.get(
      `/integrations/${integrationId}/state/${resourceType}/${resourceId}`,
      context.accessToken,
      context.region
    );
    return filterCeligoResponse(response.data);
  }
});
