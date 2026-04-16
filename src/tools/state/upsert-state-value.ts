import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const upsertStateValue = createTool({
  name: "upsert_state_value",
  description: "Create or update a global state value for an integration.",
  inputSchema: {
    integrationId: z.string().describe("The ID of the integration"),
    key: z.string().describe("The state key"),
    value: z.any().describe("The state value to set"),
  },
  handler: async ({ integrationId, key, value }, context) => {
    const response = await api.put(
      `/integrations/${integrationId}/state/${encodeURIComponent(key)}`,
      context.accessToken,
      context.region,
      { value }
    );
    return filterCeligoResponse(response.data);
  }
});
