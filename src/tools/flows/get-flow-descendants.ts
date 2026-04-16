import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const getFlowDescendants = createTool({
  name: "get_flow_descendants",
  description: "List all exports and imports that belong to a flow.",
  inputSchema: {
    flowId: z.string().describe("The ID of the flow"),
  },
  handler: async ({ flowId }, context) => {
    const response = await api.get(
      `/flows/${flowId}/descendants`,
      context.accessToken,
      context.region
    );
    return filterCeligoResponse(response.data);
  }
});
