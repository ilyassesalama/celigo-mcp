import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const getResolvedErrors = createTool({
  name: "get_resolved_errors",
  description: "Retrieve resolved errors for a specific export or import within a flow.",
  inputSchema: {
    flowId: z.string().describe("The ID of the flow"),
    exportId: z.string().optional().describe("The ID of the export"),
    importId: z.string().optional().describe("The ID of the import"),
  },
  handler: async ({ flowId, exportId, importId }, context) => {
    const expOrImpId = exportId || importId;
    if (!expOrImpId) throw new Error('Either exportId or importId must be specified');
    const response = await api.get(
      `/flows/${flowId}/${expOrImpId}/resolved`,
      context.accessToken,
      context.region
    );
    return filterCeligoResponse(response.data);
  }
});
