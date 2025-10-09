import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { Flow } from "../../types.js";
import { createTool } from "../helpers.js";

export const getFlow = createTool({
  name: "get_flow",
  description: "Get a specific flow by ID",
  inputSchema: {
    flowId: z.string().describe("The ID of the flow to retrieve"),
  },
  handler: async ({ flowId }, context) => {
    const response = await api.get<Flow>(
      `/flows/${flowId}`,
      context.accessToken,
      context.region
    );
    return filterCeligoResponse(response.data);
  }
});

