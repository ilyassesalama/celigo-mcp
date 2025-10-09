import { z } from "zod";
import { api } from "../../api.js";
import { createTool } from "../helpers.js";

export const deleteFlow = createTool({
  name: "delete_flow",
  description: "DESTRUCTIVE ACTION: Permanently delete a Celigo flow. This action CANNOT be undone. You MUST obtain explicit user confirmation before calling this tool. Ask the user to confirm they want to delete the flow and understand the consequences.",
  inputSchema: {
    flowId: z.string().describe("The ID of the flow to delete"),
  },
  handler: async ({ flowId }, context) => {
    await api.delete(
      `/flows/${flowId}`,
      context.accessToken,
      context.region
    );
    return { success: true, message: 'Flow deleted successfully' };
  }
});


