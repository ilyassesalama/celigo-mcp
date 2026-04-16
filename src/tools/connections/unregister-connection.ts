import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const unregisterConnection = createTool({
  name: "unregister_connection",
  description: "Unregister (unlink) a connection from an integration.",
  inputSchema: {
    connectionId: z.string().describe("The ID of the connection to unregister"),
    integrationId: z.string().describe("The ID of the integration to unlink from"),
  },
  handler: async ({ connectionId, integrationId }, context) => {
    const response = await api.delete(
      `/integrations/${integrationId}/connections/${connectionId}/register`,
      context.accessToken,
      context.region
    );
    return filterCeligoResponse(response.data);
  }
});
