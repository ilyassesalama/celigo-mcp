import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const registerConnection = createTool({
  name: "register_connection",
  description: "Register (link) a connection to an integration.",
  inputSchema: {
    connectionId: z.string().describe("The ID of the connection to register"),
    integrationId: z.string().describe("The ID of the integration to link to"),
  },
  handler: async ({ connectionId, integrationId }, context) => {
    const response = await api.put(
      `/connections/${connectionId}/register/${integrationId}`,
      context.accessToken,
      context.region,
      {}
    );
    return filterCeligoResponse(response.data);
  }
});
