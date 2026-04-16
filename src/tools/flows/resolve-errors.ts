import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const resolveErrors = createTool({
  name: "resolve_errors",
  description: "Mark specified errors for an export or import within a flow as resolved.",
  inputSchema: {
    flowId: z.string().describe("The ID of the flow"),
    exportId: z.string().optional().describe("The ID of the export whose errors to resolve"),
    importId: z.string().optional().describe("The ID of the import whose errors to resolve"),
    errors: z.array(z.string()).describe("Array of errorId values to resolve"),
  },
  handler: async ({ flowId, exportId, importId, errors }, context) => {
    const expOrImpId = exportId || importId;
    if (!expOrImpId) throw new Error('Either exportId or importId must be specified');
    const response = await api.put(
      `/flows/${flowId}/${expOrImpId}/resolved`,
      context.accessToken,
      context.region,
      { errors }
    );
    return filterCeligoResponse(response.data);
  }
});
