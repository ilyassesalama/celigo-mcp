import { z } from "zod";
import { api } from "../../api.js";
import { createTool } from "../helpers.js";

export const deleteIntegration = createTool({
  name: "delete_integration",
  description: "Delete a Celigo integration",
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

