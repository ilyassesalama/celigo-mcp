import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const retryErrors = createTool({
  name: "retry_errors",
  description: "Retry failed records for an export within a flow.",
  inputSchema: {
    flowId: z.string().describe("The ID of the flow"),
    exportId: z.string().describe("The ID of the export"),
    retryDataKeys: z.array(z.string()).describe("Array of retry data keys from the error records"),
  },
  handler: async ({ flowId, exportId, retryDataKeys }, context) => {
    const response = await api.put(
      `/flows/${flowId}/exports/${exportId}/retry`,
      context.accessToken,
      context.region,
      { retryDataKeys }
    );
    return filterCeligoResponse(response.data);
  }
});
