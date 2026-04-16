import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { Connection } from "../../types.js";
import { createTool } from "../helpers.js";

export const getIntegrationConnections = createTool({
  name: "get_integration_connections",
  description: "List all connections belonging to a specific integration.",
  inputSchema: {
    integrationId: z.string().describe("The ID of the integration"),
  },
  handler: async ({ integrationId }, context) => {
    const response = await api.get<Connection[]>(
      `/integrations/${integrationId}/connections`,
      context.accessToken,
      context.region
    );
    return filterCeligoResponse(response.data);
  }
});
