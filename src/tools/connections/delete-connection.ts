import { z } from "zod";
import { api } from "../../api.js";
import { createTool } from "../helpers.js";

export const deleteConnection = createTool({
  name: "delete_connection",
  description: "Delete a Celigo connection",
  inputSchema: {
    connectionId: z.string().describe("The ID of the connection to delete"),
  },
  handler: async ({ connectionId }, context) => {
    await api.delete(
      `/connections/${connectionId}`,
      context.accessToken,
      context.region
    );
    return { success: true, message: 'Connection deleted successfully' };
  }
});

