import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const getResourceStateValue = createTool({
  name: "get_resource_state_value",
  description: "Get a state value scoped to a specific resource (export, import, connection, flow, integration).",
  inputSchema: {
    resourceType: z.string().describe("Resource type path segment (e.g., 'exports', 'imports', 'connections', 'flows', 'integrations')"),
    resourceId: z.string().describe("The ID of the resource"),
    key: z.string().describe("The state key to retrieve"),
  },
  handler: async ({ resourceType, resourceId, key }, context) => {
    const response = await api.get(
      `/${resourceType}/${resourceId}/state/${encodeURIComponent(key)}`,
      context.accessToken,
      context.region
    );
    return filterCeligoResponse(response.data);
  }
});
