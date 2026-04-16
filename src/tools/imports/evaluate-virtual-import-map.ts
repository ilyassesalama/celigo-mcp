import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const evaluateVirtualImportMap = createTool({
  name: "evaluate_virtual_import_map",
  description: "Test field mapping transformations for an import without executing it.",
  inputSchema: {
    connectionId: z.string().describe("The ID of the connection"),
    import: z.record(z.any()).describe("Import configuration with mappings"),
    data: z.array(z.any()).describe("Sample data records to test mapping against"),
  },
  handler: async ({ connectionId, import: importConfig, data }, context) => {
    const response = await api.post(
      '/imports/virtual/mapping',
      context.accessToken,
      context.region,
      { _connectionId: connectionId, ...importConfig, data }
    );
    return filterCeligoResponse(response.data);
  }
});
