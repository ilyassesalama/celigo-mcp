import { z } from "zod";
import { api } from "../../api.js";
import { createTool } from "../helpers.js";

export const deleteAllState = createTool({
  name: "delete_all_state",
  description: "DESTRUCTIVE ACTION: Delete ALL global state keys for an integration. This action CANNOT be undone. You MUST obtain explicit user confirmation.",
  inputSchema: {
    integrationId: z.string().describe("The ID of the integration"),
  },
  handler: async ({ integrationId }, context) => {
    await api.delete(
      `/integrations/${integrationId}/state`,
      context.accessToken,
      context.region
    );
    return { success: true, message: 'All state values deleted successfully' };
  }
});
