import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const assignExportError = createTool({
  name: "assign_export_error",
  description: "Assign an export error to a specific user for resolution.",
  inputSchema: {
    flowId: z.string().describe("The ID of the flow"),
    exportId: z.string().describe("The ID of the export"),
    email: z.string().describe("Email of the user to assign the error to"),
  },
  handler: async ({ flowId, exportId, email }, context) => {
    const response = await api.put(
      `/flows/${flowId}/exports/${exportId}/errors/assign`,
      context.accessToken,
      context.region,
      { email }
    );
    return filterCeligoResponse(response.data);
  }
});
