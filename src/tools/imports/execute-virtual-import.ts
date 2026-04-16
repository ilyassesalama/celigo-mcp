import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const executeVirtualImport = createTool({
  name: "execute_virtual_import",
  description: "Execute an import with virtual/custom configuration and data.",
  inputSchema: {
    connectionId: z.string().describe("The ID of the connection to use"),
    import: z.record(z.any()).describe("Virtual import configuration"),
    data: z.array(z.any()).describe("Array of data records to import"),
  },
  handler: async ({ connectionId, import: importConfig, data }, context) => {
    const response = await api.post(
      `/connections/${connectionId}/import`,
      context.accessToken,
      context.region,
      { import: importConfig, data }
    );
    return filterCeligoResponse(response.data);
  }
});
