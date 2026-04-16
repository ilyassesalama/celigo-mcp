import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const upsertResourceStateValue = createTool({
  name: "upsert_resource_state_value",
  description: "Create or update a state value scoped to a specific resource (export, import, connection, flow, integration). The value object is stored verbatim at the key.",
  inputSchema: {
    resourceType: z.string().describe("Resource type path segment (e.g., 'exports', 'imports', 'connections', 'flows', 'integrations')"),
    resourceId: z.string().describe("The ID of the resource"),
    key: z.string().describe("The state key"),
    value: z.record(z.any()).describe("The state value object to store at this key (stored verbatim)"),
  },
  handler: async ({ resourceType, resourceId, key, value }, context) => {
    const response = await api.put(
      `/${resourceType}/${resourceId}/state/${encodeURIComponent(key)}`,
      context.accessToken,
      context.region,
      value
    );
    return filterCeligoResponse(response.data);
  }
});
