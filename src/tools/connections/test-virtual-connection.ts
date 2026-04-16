import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const testVirtualConnection = createTool({
  name: "test_virtual_connection",
  description: "Test a connection configuration without saving it first.",
  inputSchema: {
    name: z.string().describe("Name of the connection to test"),
    type: z.string().describe("Connection type (e.g., 'http', 'netsuite', 'salesforce')"),
    rest: z.record(z.any()).optional().describe("REST connection configuration"),
    soap: z.record(z.any()).optional().describe("SOAP connection configuration"),
  },
  handler: async (params, context) => {
    const response = await api.post(
      '/connections/virtual/test',
      context.accessToken,
      context.region,
      params
    );
    return filterCeligoResponse(response.data);
  }
});
