import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { ExportConfig } from "../../types.js";
import { createTool } from "../helpers.js";

export const createExport = createTool({
  name: "create_export",
  description: `Create a new Celigo export configuration.

Exports are used to extract data from source systems. They can be:
- HTTP exports (REST APIs, webhooks)
- NetSuite exports (saved searches, record queries)
- Salesforce exports (SOQL queries, distributed/real-time)
- Database exports
- File exports

Configuration includes:
- Connection details
- Query or extraction logic
- Field mappings
- Pagination settings
- Scheduling options

Example for HTTP export:
{
  "name": "Salesforce Opportunities Export",
  "_connectionId": "conn123",
  "type": "delta",
  "http": {
    "relativeURI": "/services/data/v58.0/query",
    "method": "GET"
  }
}`,
  inputSchema: {
    name: z.string().describe("Name of the export"),
    _connectionId: z.string().describe("ID of the connection to use"),
    type: z.string().optional().describe("Export type (e.g., 'test', 'delta', 'once')"),
    config: z.record(z.any()).optional().describe("Additional export configuration (adaptor-specific)"),
  },
  handler: async ({ name, _connectionId, type, config }, context) => {
    const exportData = {
      name,
      _connectionId,
      ...(type && { type }),
      ...config,
    };

    const response = await api.post<ExportConfig>(
      '/exports',
      context.accessToken,
      context.region,
      exportData
    );
    return filterCeligoResponse(response.data);
  }
});

