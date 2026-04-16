import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const updateFlowErrorTags = createTool({
  name: "update_flow_error_tags",
  description: "Update tags on specific errors for a flow's export or import. Passes the full set of tags — missing tags are removed.",
  inputSchema: {
    flowId: z.string().describe("The ID of the flow"),
    exportId: z.string().optional().describe("The ID of the export whose error tags to update"),
    importId: z.string().optional().describe("The ID of the import whose error tags to update"),
    errors: z.array(z.object({
      id: z.string().describe("errorId"),
      rdk: z.string().describe("retryDataKey"),
    })).describe("Errors to tag, each with {id, rdk}"),
    tagIds: z.array(z.string()).describe("Final set of tag IDs (replaces existing tags on each error)"),
  },
  handler: async ({ flowId, exportId, importId, errors, tagIds }, context) => {
    const expOrImpId = exportId || importId;
    if (!expOrImpId) throw new Error('Either exportId or importId must be specified');
    const response = await api.put(
      `/flows/${flowId}/${expOrImpId}/tags`,
      context.accessToken,
      context.region,
      { errors, tagIds }
    );
    return filterCeligoResponse(response.data);
  }
});
