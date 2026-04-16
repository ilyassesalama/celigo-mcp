import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { IClient } from "../../types.js";
import { createTool } from "../helpers.js";

export const listIClients = createTool({
  name: "list_iclients",
  description: "List all iClients.",
  inputSchema: {},
  handler: async (_params, context) => {
    const response = await api.get<IClient[]>(
      '/iclients',
      context.accessToken,
      context.region
    );
    return filterCeligoResponse(response.data);
  }
});
