import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const getResolvedErrors = createTool({
  name: "get_resolved_errors",
  description: "Retrieve resolved errors for a specific export within a flow.",
  inputSchema: {
    flowId: z.string().describe("The ID of the flow"),
    exportId: z.string().describe("The ID of the export"),
  },
  handler: async ({ flowId, exportId }, context) => {
    const response = await api.get(
      `/flows/${flowId}/exports/${exportId}/resolved`,
      context.accessToken,
      context.region
    );
    return filterCeligoResponse(response.data);
  }
});
