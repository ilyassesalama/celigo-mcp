import { z } from "zod";
import { api } from "../../api.js";
import { createTool } from "../helpers.js";

export const deleteUser = createTool({
  name: "delete_user",
  description: "DESTRUCTIVE ACTION: Remove a user from the account. This action CANNOT be undone. You MUST obtain explicit user confirmation before calling this tool.",
  inputSchema: {
    userId: z.string().describe("The ID of the user share to delete"),
  },
  handler: async ({ userId }, context) => {
    await api.delete(
      `/ashares/${userId}`,
      context.accessToken,
      context.region
    );
    return { success: true, message: 'User removed successfully' };
  }
});
