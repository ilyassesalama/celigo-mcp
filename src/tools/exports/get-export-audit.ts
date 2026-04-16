import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const getExportAudit = createTool({
  name: "get_export_audit",
  description: "Get audit log for a specific export, showing change history.",
  inputSchema: {
    exportId: z.string().describe("The ID of the export"),
  },
  handler: async ({ exportId }, context) => {
    const response = await api.get(
      `/exports/${exportId}/audit`,
      context.accessToken,
      context.region
    );
    return filterCeligoResponse(response.data);
  }
});
