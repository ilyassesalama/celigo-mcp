import { z } from "zod";
import { api } from "../../api.js";
import { Connection } from "../../types.js";
import { createTool } from "../helpers.js";

export const updateConnection = createTool({
  name: "update_connection",
  description: "Update an existing Celigo connection",
  inputSchema: {
    connectionId: z.string().describe("The ID of the connection to update"),
    name: z.string().optional().describe("New name for the connection"),
    config: z.record(z.any()).optional().describe("Updated connection configuration"),
  },
  handler: async ({ connectionId, name, config }, context) => {
    const updateData: any = {};
    if (name) updateData.name = name;
    if (config) Object.assign(updateData, config);

    const response = await api.put<Connection>(
      `/connections/${connectionId}`,
      context.accessToken,
      context.region,
      updateData
    );
    return response.data;
  }
});

