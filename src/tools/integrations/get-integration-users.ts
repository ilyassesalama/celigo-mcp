import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const getIntegrationUsers = createTool({
  name: "get_integration_users",
  description: "List all users with access to a specific integration.",
  inputSchema: {
    integrationId: z.string().describe("The ID of the integration"),
  },
  handler: async ({ integrationId }, context) => {
    const response = await api.get(
      `/integrations/${integrationId}/ashares`,
      context.accessToken,
      context.region
    );
    return filterCeligoResponse(response.data);
  }
});
