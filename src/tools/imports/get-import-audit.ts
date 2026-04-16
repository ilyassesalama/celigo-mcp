import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const getImportAudit = createTool({
  name: "get_import_audit",
  description: "Get audit log for a specific import, showing change history.",
  inputSchema: {
    importId: z.string().describe("The ID of the import"),
  },
  handler: async ({ importId }, context) => {
    const response = await api.get(
      `/imports/${importId}/audit`,
      context.accessToken,
      context.region
    );
    return filterCeligoResponse(response.data);
  }
});
