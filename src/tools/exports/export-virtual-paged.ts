import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const exportVirtualPaged = createTool({
  name: "export_virtual_paged",
  description: "Execute a paginated virtual export retrieval.",
  inputSchema: {
    connectionId: z.string().describe("The ID of the connection to use"),
    export: z.record(z.any()).describe("Virtual export configuration"),
    pagedExportState: z.record(z.any()).optional().describe("State from previous page for continuation"),
  },
  handler: async ({ connectionId, export: exportConfig, pagedExportState }, context) => {
    const response = await api.post(
      `/connections/${connectionId}/export/pages`,
      context.accessToken,
      context.region,
      { export: exportConfig, ...(pagedExportState && { pagedExportState }) }
    );
    return filterCeligoResponse(response.data);
  }
});
