import { z } from "zod";
import { api } from "../../api.js";
import { createTool } from "../helpers.js";

export const deleteAllResourceState = createTool({
  name: "delete_all_resource_state",
  description: "DESTRUCTIVE ACTION: Delete ALL state for a specific resource. This action CANNOT be undone. You MUST obtain explicit user confirmation.",
  inputSchema: {
    integrationId: z.string().describe("The ID of the integration"),
    resourceType: z.string().describe("Resource type (e.g., 'exports', 'imports', 'connections')"),
    resourceId: z.string().describe("The ID of the resource"),
  },
  handler: async ({ integrationId, resourceType, resourceId }, context) => {
    await api.delete(
      `/integrations/${integrationId}/state/${resourceType}/${resourceId}`,
      context.accessToken,
      context.region
    );
    return { success: true, message: 'All resource state values deleted successfully' };
  }
});
