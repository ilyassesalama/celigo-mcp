import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const listStateKeys = createTool({
  name: "list_state_keys",
  description: "List all global state keys for an integration.",
  inputSchema: {
    integrationId: z.string().describe("The ID of the integration"),
  },
  handler: async ({ integrationId }, context) => {
    const response = await api.get(
      `/integrations/${integrationId}/state`,
      context.accessToken,
      context.region
    );
    return filterCeligoResponse(response.data);
  }
});
