import { z } from "zod";
import { api } from "../../api.js";
import { createTool } from "../helpers.js";

export const deleteScript = createTool({
  name: "delete_script",
  description: "DESTRUCTIVE ACTION: Permanently delete a script. This action CANNOT be undone. You MUST obtain explicit user confirmation before calling this tool.",
  inputSchema: {
    scriptId: z.string().describe("The ID of the script to delete"),
  },
  handler: async ({ scriptId }, context) => {
    await api.delete(
      `/scripts/${scriptId}`,
      context.accessToken,
      context.region
    );
    return { success: true, message: 'Script deleted successfully' };
  }
});
