import { z } from "zod";
import { api } from "../../api.js";
import { createTool } from "../helpers.js";

export const deleteTag = createTool({
  name: "delete_tag",
  description: "DESTRUCTIVE ACTION: Permanently delete a tag. This action CANNOT be undone. You MUST obtain explicit user confirmation before calling this tool.",
  inputSchema: {
    tagId: z.string().describe("The ID of the tag to delete"),
  },
  handler: async ({ tagId }, context) => {
    await api.delete(
      `/tags/${tagId}`,
      context.accessToken,
      context.region
    );
    return { success: true, message: 'Tag deleted successfully' };
  }
});
