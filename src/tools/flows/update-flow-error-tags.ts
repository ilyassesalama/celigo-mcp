import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const updateFlowErrorTags = createTool({
  name: "update_flow_error_tags",
  description: "Assign tags to errors within a flow.",
  inputSchema: {
    flowId: z.string().describe("The ID of the flow"),
    exportId: z.string().describe("The ID of the export"),
    tagIds: z.array(z.string()).describe("Array of tag IDs to assign"),
  },
  handler: async ({ flowId, exportId, tagIds }, context) => {
    const response = await api.put(
      `/flows/${flowId}/errors/tags`,
      context.accessToken,
      context.region,
      { _exportId: exportId, _tagIds: tagIds }
    );
    return filterCeligoResponse(response.data);
  }
});
