import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { ImportConfig } from "../../types.js";
import { createTool } from "../helpers.js";

export const createImport = createTool({
  name: "create_import",
  description: `Create a new Celigo import configuration.

Imports are used to send data to destination systems. They can be:
- HTTP imports (REST APIs, POST/PUT requests)
- NetSuite imports (record creation/updates)
- Salesforce imports (record upserts)
- Database imports
- File imports

Configuration includes:
- Connection details
- API identifier or endpoint
- Field mappings
- Lookup configurations
- Error handling
- Batch settings

Example for NetSuite import:
{
  "name": "NetSuite Sales Orders Import",
  "_connectionId": "conn123",
  "apiIdentifier": "salesorder",
  "mapping": {
    "fields": [
      { "extract": "orderId", "generate": "tranId" },
      { "extract": "customerId", "generate": "entity" }
    ]
  }
}`,
  inputSchema: {
    name: z.string().describe("Name of the import"),
    _connectionId: z.string().describe("ID of the connection to use"),
    apiIdentifier: z.string().describe("API identifier (e.g., 'salesorder' for NetSuite, 'Account' for Salesforce) - REQUIRED"),
    config: z.record(z.any()).optional().describe("Additional import configuration including mappings, lookups, etc."),
  },
  handler: async ({ name, _connectionId, apiIdentifier, config }, context) => {
    const importData = {
      name,
      _connectionId,
      apiIdentifier,
      ...config,
    };

    const response = await api.post<ImportConfig>(
      '/imports',
      context.accessToken,
      context.region,
      importData
    );
    return filterCeligoResponse(response.data);
  }
});

