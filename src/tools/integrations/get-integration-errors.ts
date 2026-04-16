import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const getIntegrationErrors = createTool({
  name: "get_integration_errors",
  description: "Retrieve open errors across all flows in an integration.",
  inputSchema: {
    integrationId: z.string().describe("The ID of the integration"),
  },
  handler: async ({ integrationId }, context) => {
    const response = await api.get(
      `/integrations/${integrationId}/errors`,
      context.accessToken,
      context.region
    );
    return filterCeligoResponse(response.data);
  }
});
