import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const testVirtualConnection = createTool({
  name: "test_virtual_connection",
  description: "Test (ping) a connection configuration without saving it first. Pass the full connection body (type, http/rest/netsuite/ftp/...).",
  inputSchema: {
    name: z.string().optional().describe("Name of the connection to test"),
    type: z.string().describe("Connection type (e.g., 'http', 'netsuite', 'salesforce', 'rest', 'ftp')"),
    config: z.record(z.any()).optional().describe("Adaptor-specific connection body (e.g. { http: {...} }, { rest: {...} }, { netsuite: {...} }). Fields are merged into the request."),
  },
  handler: async ({ name, type, config }, context) => {
    const body = { ...(name ? { name } : {}), type, ...(config ?? {}) };
    const response = await api.post(
      '/connections/ping',
      context.accessToken,
      context.region,
      body
    );
    return filterCeligoResponse(response.data);
  }
});
