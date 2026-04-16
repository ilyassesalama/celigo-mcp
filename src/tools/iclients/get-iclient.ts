import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { IClient } from "../../types.js";
import { createTool } from "../helpers.js";

export const getIClient = createTool({
  name: "get_iclient",
  description: "Get a specific iClient by ID.",
  inputSchema: {
    iclientId: z.string().describe("The ID of the iClient to retrieve"),
  },
  handler: async ({ iclientId }, context) => {
    const response = await api.get<IClient>(
      `/iclients/${iclientId}`,
      context.accessToken,
      context.region
    );
    return filterCeligoResponse(response.data);
  }
});
