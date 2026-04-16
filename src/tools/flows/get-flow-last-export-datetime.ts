import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const getFlowLastExportDatetime = createTool({
  name: "get_flow_last_export_datetime",
  description: "Get the timestamp of the last export execution for a flow.",
  inputSchema: {
    flowId: z.string().describe("The ID of the flow"),
  },
  handler: async ({ flowId }, context) => {
    const response = await api.get(
      `/flows/${flowId}/lastExportDateTime`,
      context.accessToken,
      context.region
    );
    return filterCeligoResponse(response.data);
  }
});
