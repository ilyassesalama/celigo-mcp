import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const retryErrors = createTool({
  name: "retry_errors",
  description: "Retry failed records for a specific export or import within a flow.",
  inputSchema: {
    flowId: z.string().describe("The ID of the flow"),
    exportId: z.string().optional().describe("The ID of the export whose errors to retry"),
    importId: z.string().optional().describe("The ID of the import whose errors to retry"),
    retryDataKeys: z.array(z.string()).describe("Array of retry data keys from the error records"),
  },
  handler: async ({ flowId, exportId, importId, retryDataKeys }, context) => {
    const expOrImpId = exportId || importId;
    if (!expOrImpId) throw new Error('Either exportId or importId must be specified');
    const response = await api.post(
      `/flows/${flowId}/${expOrImpId}/retry`,
      context.accessToken,
      context.region,
      { retryDataKeys }
    );
    return filterCeligoResponse(response.data);
  }
});
