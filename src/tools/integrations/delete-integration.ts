import { z } from "zod";
import { api } from "../../api.js";
import { createTool } from "../helpers.js";

export const deleteIntegration = createTool({
  name: "delete_integration",
  description: "DESTRUCTIVE ACTION: Permanently delete a Celigo integration. This action CANNOT be undone and will delete all associated flows and configurations. You MUST obtain explicit user confirmation before calling this tool. Ask the user to confirm they want to delete the integration and understand the consequences.",
  inputSchema: {
    integrationId: z.string().describe("The ID of the integration to delete"),
  },
  handler: async ({ integrationId }, context) => {
    await api.delete(
      `/integrations/${integrationId}`,
      context.accessToken,
      context.region
    );
    return { success: true, message: 'Integration deleted successfully' };
  }
});

