import { z } from "zod";
import { api } from "../../api.js";
import { createTool } from "../helpers.js";

export const deleteConnection = createTool({
  name: "delete_connection",
  description: "DESTRUCTIVE ACTION: Permanently delete a Celigo connection. This action CANNOT be undone. You MUST obtain explicit user confirmation before calling this tool. Ask the user to confirm they want to delete the connection and understand the consequences.",
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

