import { z } from "zod";
import { api } from "../../api.js";
import { createTool } from "../helpers.js";

export const deleteAllResourceState = createTool({
  name: "delete_all_resource_state",
  description: "DESTRUCTIVE ACTION: Delete ALL state scoped to a specific resource. This action CANNOT be undone. You MUST obtain explicit user confirmation.",
  inputSchema: {
    resourceType: z.string().describe("Resource type path segment (e.g., 'exports', 'imports', 'connections', 'flows', 'integrations')"),
    resourceId: z.string().describe("The ID of the resource"),
  },
  handler: async ({ resourceType, resourceId }, context) => {
    await api.delete(
      `/${resourceType}/${resourceId}/state`,
      context.accessToken,
      context.region
    );
    return { success: true, message: 'All resource state values deleted successfully' };
  }
});
