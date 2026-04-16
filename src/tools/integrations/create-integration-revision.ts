import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const createIntegrationRevision = createTool({
  name: "create_integration_revision",
  description: "Create a snapshot/revision of the current integration state.",
  inputSchema: {
    integrationId: z.string().describe("The ID of the integration"),
  },
  handler: async ({ integrationId }, context) => {
    const response = await api.post(
      `/integrations/${integrationId}/revisions`,
      context.accessToken,
      context.region,
      {}
    );
    return filterCeligoResponse(response.data);
  }
});
