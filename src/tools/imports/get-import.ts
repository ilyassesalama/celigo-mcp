import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { ImportConfig } from "../../types.js";
import { createTool } from "../helpers.js";

export const getImport = createTool({
  name: "get_import",
  description: "Get a specific import configuration by ID",
  inputSchema: {
    importId: z.string().describe("The ID of the import to retrieve"),
  },
  handler: async ({ importId }, context) => {
    const response = await api.get<ImportConfig>(
      `/imports/${importId}`,
      context.accessToken,
      context.region
    );
    return filterCeligoResponse(response.data);
  }
});

