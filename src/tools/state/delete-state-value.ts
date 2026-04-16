import { z } from "zod";
import { api } from "../../api.js";
import { createTool } from "../helpers.js";

export const deleteStateValue = createTool({
  name: "delete_state_value",
  description: "Delete a specific global state key for an integration.",
  inputSchema: {
    integrationId: z.string().describe("The ID of the integration"),
    key: z.string().describe("The state key to delete"),
  },
  handler: async ({ integrationId, key }, context) => {
    await api.delete(
      `/integrations/${integrationId}/state/${encodeURIComponent(key)}`,
      context.accessToken,
      context.region
    );
    return { success: true, message: 'State value deleted successfully' };
  }
});
