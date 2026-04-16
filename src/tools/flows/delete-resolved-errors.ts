import { z } from "zod";
import { api } from "../../api.js";
import { createTool } from "../helpers.js";

export const deleteResolvedErrors = createTool({
  name: "delete_resolved_errors",
  description: "DESTRUCTIVE ACTION: Clear all resolved errors for an export. This action CANNOT be undone. You MUST obtain explicit user confirmation.",
  inputSchema: {
    flowId: z.string().describe("The ID of the flow"),
    exportId: z.string().describe("The ID of the export"),
  },
  handler: async ({ flowId, exportId }, context) => {
    await api.delete(
      `/flows/${flowId}/exports/${exportId}/resolved`,
      context.accessToken,
      context.region
    );
    return { success: true, message: 'Resolved errors cleared successfully' };
  }
});
