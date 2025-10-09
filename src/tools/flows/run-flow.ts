import { z } from "zod";
import { api } from "../../api.js";
import { createTool } from "../helpers.js";

export const runFlow = createTool({
  name: "run_flow",
  description: "Run a specific Celigo flow",
  inputSchema: {
    flowId: z.string().describe("The ID of the flow to run"),
  },
  handler: async ({ flowId }, context) => {
    const response = await api.post(
      `/flows/${flowId}/run`,
      context.accessToken,
      context.region,
      {}
    );
    return response.data;
  }
});

