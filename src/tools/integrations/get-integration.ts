import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { Integration } from "../../types.js";
import { createTool } from "../helpers.js";

export const getIntegration = createTool({
  name: "get_integration",
  description: "Get a specific Celigo integration by ID",
  inputSchema: {
    integrationId: z.string().describe("The ID of the integration to retrieve"),
  },
  handler: async ({ integrationId }, context) => {
    const response = await api.get<Integration>(
      `/integrations/${integrationId}`,
      context.accessToken,
      context.region
    );
    return filterCeligoResponse(response.data);
  }
});

