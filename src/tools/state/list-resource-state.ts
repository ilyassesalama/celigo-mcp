import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const listResourceState = createTool({
  name: "list_resource_state",
  description: "List all state keys scoped to a specific resource (export, import, connection, flow, integration).",
  inputSchema: {
    resourceType: z.string().describe("Resource type path segment (e.g., 'exports', 'imports', 'connections', 'flows', 'integrations')"),
    resourceId: z.string().describe("The ID of the resource"),
  },
  handler: async ({ resourceType, resourceId }, context) => {
    const response = await api.get(
      `/${resourceType}/${resourceId}/state`,
      context.accessToken,
      context.region
    );
    return filterCeligoResponse(response.data);
  }
});
