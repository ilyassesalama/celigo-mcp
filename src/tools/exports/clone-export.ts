import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { ExportConfig } from "../../types.js";
import { createTool } from "../helpers.js";

export const cloneExport = createTool({
  name: "clone_export",
  description: "Clone an existing export with connection remapping.",
  inputSchema: {
    exportId: z.string().describe("The ID of the export to clone"),
    connectionMap: z.record(z.string()).describe("Map of old connection IDs to new connection IDs"),
  },
  handler: async ({ exportId, connectionMap }, context) => {
    const response = await api.post<ExportConfig>(
      `/exports/${exportId}/clone`,
      context.accessToken,
      context.region,
      { connectionMap }
    );
    return filterCeligoResponse(response.data);
  }
});
