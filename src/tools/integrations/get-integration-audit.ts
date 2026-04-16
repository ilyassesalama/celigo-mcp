import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const getIntegrationAudit = createTool({
  name: "get_integration_audit",
  description: "Get audit log for a specific integration, showing change history.",
  inputSchema: {
    integrationId: z.string().describe("The ID of the integration"),
  },
  handler: async ({ integrationId }, context) => {
    const response = await api.get(
      `/integrations/${integrationId}/audit`,
      context.accessToken,
      context.region
    );
    return filterCeligoResponse(response.data);
  }
});
