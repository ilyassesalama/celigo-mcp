import { z } from "zod";
import { makeRequest } from "../../api.js";
import { createTool } from "../helpers.js";

export const deleteResolvedErrors = createTool({
  name: "delete_resolved_errors",
  description: "DESTRUCTIVE ACTION: Delete specified resolved errors for a flow's export or import. This action CANNOT be undone. You MUST obtain explicit user confirmation.",
  inputSchema: {
    flowId: z.string().describe("The ID of the flow"),
    exportId: z.string().optional().describe("The ID of the export"),
    importId: z.string().optional().describe("The ID of the import"),
    errors: z.array(z.string()).describe("Array of resolved errorId values to delete"),
  },
  handler: async ({ flowId, exportId, importId, errors }, context) => {
    const expOrImpId = exportId || importId;
    if (!expOrImpId) throw new Error('Either exportId or importId must be specified');
    // DELETE with a body (Celigo's /resolved requires the error IDs in the body).
    await makeRequest(
      'delete',
      `/flows/${flowId}/${expOrImpId}/resolved`,
      context.accessToken,
      context.region,
      { errors }
    );
    return { success: true, message: 'Resolved errors deleted successfully' };
  }
});
