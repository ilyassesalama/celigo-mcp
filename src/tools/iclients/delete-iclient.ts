import { z } from "zod";
import { api } from "../../api.js";
import { createTool } from "../helpers.js";

export const deleteIClient = createTool({
  name: "delete_iclient",
  description: "DESTRUCTIVE ACTION: Permanently delete an iClient. This action CANNOT be undone. You MUST obtain explicit user confirmation before calling this tool.",
  inputSchema: {
    iclientId: z.string().describe("The ID of the iClient to delete"),
  },
  handler: async ({ iclientId }, context) => {
    await api.delete(
      `/iclients/${iclientId}`,
      context.accessToken,
      context.region
    );
    return { success: true, message: 'iClient deleted successfully' };
  }
});
