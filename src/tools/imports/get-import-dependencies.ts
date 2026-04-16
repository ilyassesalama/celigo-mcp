import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const getImportDependencies = createTool({
  name: "get_import_dependencies",
  description: "List all resources that depend on a specific import.",
  inputSchema: {
    importId: z.string().describe("The ID of the import"),
  },
  handler: async ({ importId }, context) => {
    const response = await api.get(
      `/imports/${importId}/dependencies`,
      context.accessToken,
      context.region
    );
    return filterCeligoResponse(response.data);
  }
});
