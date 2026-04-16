import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const upsertStateValue = createTool({
  name: "upsert_state_value",
  description: "Create or update an integration-scoped state value. The value object you pass is stored verbatim at the key.",
  inputSchema: {
    integrationId: z.string().describe("The ID of the integration"),
    key: z.string().describe("The state key"),
    value: z.record(z.any()).describe("The state value object to store at this key (stored verbatim)"),
  },
  handler: async ({ integrationId, key, value }, context) => {
    const response = await api.put(
      `/integrations/${integrationId}/state/${encodeURIComponent(key)}`,
      context.accessToken,
      context.region,
      value
    );
    return filterCeligoResponse(response.data);
  }
});
