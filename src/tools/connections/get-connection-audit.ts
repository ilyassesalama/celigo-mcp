import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const getConnectionAudit = createTool({
  name: "get_connection_audit",
  description: "Get audit log for a specific connection, showing change history.",
  inputSchema: {
    connectionId: z.string().describe("The ID of the connection"),
  },
  handler: async ({ connectionId }, context) => {
    const response = await api.get(
      `/connections/${connectionId}/audit`,
      context.accessToken,
      context.region
    );
    return filterCeligoResponse(response.data);
  }
});
