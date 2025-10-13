import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { ImportConfig } from "../../types.js";
import { createTool } from "../helpers.js";

export const updateImport = createTool({
  name: "update_import",
  description: `Update an existing Celigo import configuration.

This allows you to modify:
- Import mappings and field transformations
- Lookup configurations
- Error handling settings
- Batch sizes
- Connection settings
- API identifiers

All fields in the config will replace the existing configuration.

Example:
{
  "importId": "import123",
  "config": {
    "name": "Updated NetSuite Sales Orders Import",
    "_connectionId": "conn123",
    "apiIdentifier": "salesorder",
    "mapping": {
      "fields": [
        { "extract": "orderId", "generate": "tranId" }
      ]
    }
  }
}`,
  inputSchema: {
    importId: z.string().describe("The ID of the import to update"),
    config: z.record(z.any()).describe("Updated import configuration (partial or full)"),
  },
  handler: async ({ importId, config }, context) => {
    const response = await api.put<ImportConfig>(
      `/imports/${importId}`,
      context.accessToken,
      context.region,
      config
    );
    return filterCeligoResponse(response.data);
  }
});

