import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { Connection } from "../../types.js";
import { createTool } from "../helpers.js";

export const getConnection = createTool({
  name: "get_connection",
  description: "Get a specific Celigo connection by ID",
  inputSchema: {
    connectionId: z.string().describe("The ID of the connection to retrieve"),
  },
  handler: async ({ connectionId }, context) => {
    const response = await api.get<Connection>(
      `/connections/${connectionId}`,
      context.accessToken,
      context.region
    );
    return filterCeligoResponse(response.data);
  }
});

