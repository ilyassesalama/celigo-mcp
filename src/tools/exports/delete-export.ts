import { z } from "zod";
import { api } from "../../api.js";
import { createTool } from "../helpers.js";

export const deleteExport = createTool({
  name: "delete_export",
  description: "DESTRUCTIVE ACTION: Permanently delete a Celigo export. This action CANNOT be undone and will affect any flows using this export. You MUST obtain explicit user confirmation before calling this tool. Ask the user to confirm they want to delete the export and understand the consequences.",
  inputSchema: {
    exportId: z.string().describe("The ID of the export to delete"),
  },
  handler: async ({ exportId }, context) => {
    await api.delete(
      `/exports/${exportId}`,
      context.accessToken,
      context.region
    );
    return { success: true, message: 'Export deleted successfully' };
  }
});

