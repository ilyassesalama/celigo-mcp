import { z } from "zod";
import { api } from "../../api.js";
import { Connection } from "../../types.js";
import { createTool } from "../helpers.js";

export const createConnection = createTool({
  name: "create_connection",
  description: "Create a new Celigo connection",
  inputSchema: {
    name: z.string().describe("Name of the connection"),
    type: z.string().describe("Type of connection (e.g., 'http', 'netsuite', 'salesforce')"),
    config: z.record(z.any()).describe("Connection configuration"),
  },
  handler: async ({ name, type, config }, context) => {
    const connectionData = {
      name,
      type,
      ...config,
    };

    const response = await api.post<Connection>(
      '/connections',
      context.accessToken,
      context.region,
      connectionData
    );
    return response.data;
  }
});

