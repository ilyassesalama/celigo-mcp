import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const pingConnection = createTool({
  name: "ping_connection",
  description: "Test if a connection is operational by pinging it.",
  inputSchema: {
    connectionId: z.string().describe("The ID of the connection to test"),
  },
  handler: async ({ connectionId }, context) => {
    const response = await api.get(
      `/connections/${connectionId}/ping`,
      context.accessToken,
      context.region
    );
    return filterCeligoResponse(response.data);
  }
});
