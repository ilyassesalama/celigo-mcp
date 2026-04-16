import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { ExportConfig } from "../../types.js";
import { createTool } from "../helpers.js";

export const getIntegrationExports = createTool({
  name: "get_integration_exports",
  description: "List all exports belonging to a specific integration.",
  inputSchema: {
    integrationId: z.string().describe("The ID of the integration"),
  },
  handler: async ({ integrationId }, context) => {
    const response = await api.get<ExportConfig[]>(
      `/integrations/${integrationId}/exports`,
      context.accessToken,
      context.region
    );
    return filterCeligoResponse(response.data);
  }
});
