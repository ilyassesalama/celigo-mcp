import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const getConnectionDependencies = createTool({
  name: "get_connection_dependencies",
  description: "List all resources that depend on a specific connection.",
  inputSchema: {
    connectionId: z.string().describe("The ID of the connection"),
  },
  handler: async ({ connectionId }, context) => {
    const response = await api.get(
      `/connections/${connectionId}/dependencies`,
      context.accessToken,
      context.region
    );
    return filterCeligoResponse(response.data);
  }
});
