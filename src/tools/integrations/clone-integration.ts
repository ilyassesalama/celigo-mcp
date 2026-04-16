import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { Integration } from "../../types.js";
import { createTool } from "../helpers.js";

export const cloneIntegration = createTool({
  name: "clone_integration",
  description: "Clone an existing integration and all its flows.",
  inputSchema: {
    integrationId: z.string().describe("The ID of the integration to clone"),
    name: z.string().describe("Name for the cloned integration"),
  },
  handler: async ({ integrationId, name }, context) => {
    const response = await api.post<Integration>(
      `/integrations/${integrationId}/clone`,
      context.accessToken,
      context.region,
      { name }
    );
    return filterCeligoResponse(response.data);
  }
});
