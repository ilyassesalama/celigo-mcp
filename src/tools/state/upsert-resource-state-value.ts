import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const upsertResourceStateValue = createTool({
  name: "upsert_resource_state_value",
  description: "Create or update a state value for a specific resource within an integration.",
  inputSchema: {
    integrationId: z.string().describe("The ID of the integration"),
    resourceType: z.string().describe("Resource type (e.g., 'exports', 'imports', 'connections')"),
    resourceId: z.string().describe("The ID of the resource"),
    key: z.string().describe("The state key"),
    value: z.any().describe("The state value to set"),
  },
  handler: async ({ integrationId, resourceType, resourceId, key, value }, context) => {
    const response = await api.put(
      `/integrations/${integrationId}/state/${resourceType}/${resourceId}/${encodeURIComponent(key)}`,
      context.accessToken,
      context.region,
      { value }
    );
    return filterCeligoResponse(response.data);
  }
});
