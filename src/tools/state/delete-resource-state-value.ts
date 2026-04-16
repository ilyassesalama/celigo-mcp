import { z } from "zod";
import { api } from "../../api.js";
import { createTool } from "../helpers.js";

export const deleteResourceStateValue = createTool({
  name: "delete_resource_state_value",
  description: "Delete a specific state key scoped to a resource (export, import, connection, flow, integration).",
  inputSchema: {
    resourceType: z.string().describe("Resource type path segment (e.g., 'exports', 'imports', 'connections', 'flows', 'integrations')"),
    resourceId: z.string().describe("The ID of the resource"),
    key: z.string().describe("The state key to delete"),
  },
  handler: async ({ resourceType, resourceId, key }, context) => {
    await api.delete(
      `/${resourceType}/${resourceId}/state/${encodeURIComponent(key)}`,
      context.accessToken,
      context.region
    );
    return { success: true, message: 'Resource state value deleted successfully' };
  }
});
