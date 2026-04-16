import { z } from "zod";
import { api } from "../../api.js";
import { createTool } from "../helpers.js";

export const deleteResourceStateValue = createTool({
  name: "delete_resource_state_value",
  description: "Delete a specific state key for a resource within an integration.",
  inputSchema: {
    integrationId: z.string().describe("The ID of the integration"),
    resourceType: z.string().describe("Resource type (e.g., 'exports', 'imports', 'connections')"),
    resourceId: z.string().describe("The ID of the resource"),
    key: z.string().describe("The state key to delete"),
  },
  handler: async ({ integrationId, resourceType, resourceId, key }, context) => {
    await api.delete(
      `/integrations/${integrationId}/state/${resourceType}/${resourceId}/${encodeURIComponent(key)}`,
      context.accessToken,
      context.region
    );
    return { success: true, message: 'Resource state value deleted successfully' };
  }
});
