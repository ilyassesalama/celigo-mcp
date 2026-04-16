import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const getFlowTemplate = createTool({
  name: "get_flow_template",
  description: "Download a flow as a reusable template.",
  inputSchema: {
    flowId: z.string().describe("The ID of the flow"),
  },
  handler: async ({ flowId }, context) => {
    const response = await api.get(
      `/flows/${flowId}/template`,
      context.accessToken,
      context.region
    );
    return filterCeligoResponse(response.data);
  }
});
