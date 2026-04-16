import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const executeVirtualExport = createTool({
  name: "execute_virtual_export",
  description: "Execute an export with a custom/virtual configuration without saving it.",
  inputSchema: {
    connectionId: z.string().describe("The ID of the connection to use"),
    export: z.record(z.any()).describe("Virtual export configuration"),
  },
  handler: async ({ connectionId, export: exportConfig }, context) => {
    const response = await api.post(
      `/connections/${connectionId}/export`,
      context.accessToken,
      context.region,
      { export: exportConfig }
    );
    return filterCeligoResponse(response.data);
  }
});
