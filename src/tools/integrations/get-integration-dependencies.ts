import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const getIntegrationDependencies = createTool({
  name: "get_integration_dependencies",
  description: "List all resources that depend on a specific integration.",
  inputSchema: {
    integrationId: z.string().describe("The ID of the integration"),
  },
  handler: async ({ integrationId }, context) => {
    const response = await api.get(
      `/integrations/${integrationId}/dependencies`,
      context.accessToken,
      context.region
    );
    return filterCeligoResponse(response.data);
  }
});
