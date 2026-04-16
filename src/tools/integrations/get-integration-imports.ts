import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { ImportConfig } from "../../types.js";
import { createTool } from "../helpers.js";

export const getIntegrationImports = createTool({
  name: "get_integration_imports",
  description: "List all imports belonging to a specific integration.",
  inputSchema: {
    integrationId: z.string().describe("The ID of the integration"),
  },
  handler: async ({ integrationId }, context) => {
    const response = await api.get<ImportConfig[]>(
      `/integrations/${integrationId}/imports`,
      context.accessToken,
      context.region
    );
    return filterCeligoResponse(response.data);
  }
});
