import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const invokeImport = createTool({
  name: "invoke_import",
  description: "Trigger a manual execution of an import.",
  inputSchema: {
    importId: z.string().describe("The ID of the import to invoke"),
  },
  handler: async ({ importId }, context) => {
    const response = await api.post(
      `/imports/${importId}/invoke`,
      context.accessToken,
      context.region,
      {}
    );
    return filterCeligoResponse(response.data);
  }
});
