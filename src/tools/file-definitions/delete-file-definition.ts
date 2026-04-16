import { z } from "zod";
import { api } from "../../api.js";
import { createTool } from "../helpers.js";

export const deleteFileDefinition = createTool({
  name: "delete_file_definition",
  description: "DESTRUCTIVE ACTION: Permanently delete a file definition. This action CANNOT be undone. You MUST obtain explicit user confirmation before calling this tool.",
  inputSchema: {
    fileDefinitionId: z.string().describe("The ID of the file definition to delete"),
  },
  handler: async ({ fileDefinitionId }, context) => {
    await api.delete(
      `/filedefinitions/${fileDefinitionId}`,
      context.accessToken,
      context.region
    );
    return { success: true, message: 'File definition deleted successfully' };
  }
});
