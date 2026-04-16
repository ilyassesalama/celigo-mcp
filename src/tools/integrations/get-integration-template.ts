import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const getIntegrationTemplate = createTool({
  name: "get_integration_template",
  description: "Download an integration as a reusable template.",
  inputSchema: {
    integrationId: z.string().describe("The ID of the integration"),
  },
  handler: async ({ integrationId }, context) => {
    const response = await api.get(
      `/integrations/${integrationId}/template`,
      context.accessToken,
      context.region
    );
    return filterCeligoResponse(response.data);
  }
});
