import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const getStateValue = createTool({
  name: "get_state_value",
  description: "Get a global state value by key for an integration.",
  inputSchema: {
    integrationId: z.string().describe("The ID of the integration"),
    key: z.string().describe("The state key to retrieve"),
  },
  handler: async ({ integrationId, key }, context) => {
    const response = await api.get(
      `/integrations/${integrationId}/state/${encodeURIComponent(key)}`,
      context.accessToken,
      context.region
    );
    return filterCeligoResponse(response.data);
  }
});
