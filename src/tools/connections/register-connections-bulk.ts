import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const registerConnectionsBulk = createTool({
  name: "register_connections_bulk",
  description: "Register (link) multiple connections to an integration at once.",
  inputSchema: {
    connectionIds: z.array(z.string()).describe("Array of connection IDs to register"),
    integrationId: z.string().describe("The ID of the integration to link to"),
  },
  handler: async ({ connectionIds, integrationId }, context) => {
    const response = await api.put(
      `/connections/register/${integrationId}`,
      context.accessToken,
      context.region,
      { _connectionIds: connectionIds }
    );
    return filterCeligoResponse(response.data);
  }
});
