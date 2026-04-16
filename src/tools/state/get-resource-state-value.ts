import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const getResourceStateValue = createTool({
  name: "get_resource_state_value",
  description: "Get a state value for a specific resource within an integration.",
  inputSchema: {
    integrationId: z.string().describe("The ID of the integration"),
    resourceType: z.string().describe("Resource type (e.g., 'exports', 'imports', 'connections')"),
    resourceId: z.string().describe("The ID of the resource"),
    key: z.string().describe("The state key to retrieve"),
  },
  handler: async ({ integrationId, resourceType, resourceId, key }, context) => {
    const response = await api.get(
      `/integrations/${integrationId}/state/${resourceType}/${resourceId}/${encodeURIComponent(key)}`,
      context.accessToken,
      context.region
    );
    return filterCeligoResponse(response.data);
  }
});
