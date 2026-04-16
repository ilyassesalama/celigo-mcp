import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const resolveErrors = createTool({
  name: "resolve_errors",
  description: "Mark export errors as resolved.",
  inputSchema: {
    flowId: z.string().describe("The ID of the flow"),
    exportId: z.string().describe("The ID of the export"),
  },
  handler: async ({ flowId, exportId }, context) => {
    const response = await api.put(
      `/flows/${flowId}/exports/${exportId}/resolve`,
      context.accessToken,
      context.region,
      {}
    );
    return filterCeligoResponse(response.data);
  }
});
