import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { ExportConfig } from "../../types.js";
import { createTool } from "../helpers.js";

export const updateExport = createTool({
  name: "update_export",
  description: `Update an existing Celigo export configuration.

This allows you to modify:
- Export type (e.g., from "test" to "delta")
- Connection settings
- Query parameters
- Scheduling options
- Field mappings
- Response handling

All fields in the config will replace the existing configuration.

Example:
{
  "exportId": "export123",
  "config": {
    "name": "Updated Salesforce Opportunities Export",
    "_connectionId": "conn123",
    "type": "delta",
    "deltaDateField": "LastModifiedDate"
  }
}`,
  inputSchema: {
    exportId: z.string().describe("The ID of the export to update"),
    config: z.record(z.any()).describe("Updated export configuration (partial or full)"),
  },
  handler: async ({ exportId, config }, context) => {
    const response = await api.put<ExportConfig>(
      `/exports/${exportId}`,
      context.accessToken,
      context.region,
      config
    );
    return filterCeligoResponse(response.data);
  }
});

