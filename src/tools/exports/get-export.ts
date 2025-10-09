import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const getExport = createTool({
  name: "get_export",
  description: "Get a specific export configuration by ID",
  inputSchema: {
    exportId: z.string().describe("The ID of the export to retrieve"),
  },
  handler: async ({ exportId }, context) => {
    const response = await api.get(
      `/exports/${exportId}`,
      context.accessToken,
      context.region
    );
    return filterCeligoResponse(response.data);
  }
});

