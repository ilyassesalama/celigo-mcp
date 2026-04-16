import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const getConnectionDebugLogs = createTool({
  name: "get_connection_debug_logs",
  description: "Retrieve debug logs for a specific connection.",
  inputSchema: {
    connectionId: z.string().describe("The ID of the connection"),
    resourceId: z.string().optional().describe("Filter by specific resource ID"),
  },
  handler: async ({ connectionId, resourceId }, context) => {
    let endpoint = `/connections/${connectionId}/debug`;
    if (resourceId) endpoint += `?_resourceId=${resourceId}`;
    const response = await api.get(
      endpoint,
      context.accessToken,
      context.region
    );
    return filterCeligoResponse(response.data);
  }
});
