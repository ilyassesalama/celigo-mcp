import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const assignExportError = createTool({
  name: "assign_export_error",
  description: "Assign specific export or import errors in a flow to a user.",
  inputSchema: {
    flowId: z.string().describe("The ID of the flow"),
    exportId: z.string().optional().describe("The ID of the export whose errors to assign"),
    importId: z.string().optional().describe("The ID of the import whose errors to assign"),
    errorIds: z.array(z.string()).describe("Array of errorId values to assign"),
    email: z.string().describe("Email of the user to assign the errors to"),
  },
  handler: async ({ flowId, exportId, importId, errorIds, email }, context) => {
    const expOrImpId = exportId || importId;
    if (!expOrImpId) throw new Error('Either exportId or importId must be specified');
    const response = await api.put(
      `/flows/${flowId}/${expOrImpId}/errors/assign`,
      context.accessToken,
      context.region,
      { errorIds, email }
    );
    return filterCeligoResponse(response.data);
  }
});
