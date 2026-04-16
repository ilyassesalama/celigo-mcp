import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { IClient } from "../../types.js";
import { createTool } from "../helpers.js";

export const createIClient = createTool({
  name: "create_iclient",
  description: "Create a new SmartConnector iClient for authentication.",
  inputSchema: {
    name: z.string().optional().describe("Name of the iClient"),
    provider: z.string().describe("Authentication provider"),
  },
  handler: async (params, context) => {
    const response = await api.post<IClient>(
      '/iclients',
      context.accessToken,
      context.region,
      params
    );
    return filterCeligoResponse(response.data);
  }
});
