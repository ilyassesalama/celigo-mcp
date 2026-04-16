import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const createIntegrationRevision = createTool({
  name: "create_integration_revision",
  description: "Create a snapshot/revision of an integration. Optionally set ignoreIfNoChanges=true to skip (204) when the integration has not changed since the last snapshot.",
  inputSchema: {
    integrationId: z.string().describe("The ID of the integration"),
    ignoreIfNoChanges: z.boolean().optional().describe("If true, skip creating a snapshot when the integration has not changed since the last one"),
  },
  handler: async ({ integrationId, ignoreIfNoChanges }, context) => {
    const qs = ignoreIfNoChanges !== undefined ? `?ignoreIfNoChanges=${ignoreIfNoChanges}` : '';
    const response = await api.post(
      `/integrations/${integrationId}/revisions/create${qs}`,
      context.accessToken,
      context.region,
      {}
    );
    return filterCeligoResponse(response.data);
  }
});
