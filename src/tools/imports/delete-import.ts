import { z } from "zod";
import { api } from "../../api.js";
import { createTool } from "../helpers.js";

export const deleteImport = createTool({
  name: "delete_import",
  description: "DESTRUCTIVE ACTION: Permanently delete a Celigo import. This action CANNOT be undone and will affect any flows using this import. You MUST obtain explicit user confirmation before calling this tool. Ask the user to confirm they want to delete the import and understand the consequences.",
  inputSchema: {
    importId: z.string().describe("The ID of the import to delete"),
  },
  handler: async ({ importId }, context) => {
    await api.delete(
      `/imports/${importId}`,
      context.accessToken,
      context.region
    );
    return { success: true, message: 'Import deleted successfully' };
  }
});

