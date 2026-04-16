import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { IClient } from "../../types.js";
import { createTool } from "../helpers.js";

export const updateIClient = createTool({
  name: "update_iclient",
  description: "Update an existing iClient configuration.",
  inputSchema: {
    iclientId: z.string().describe("The ID of the iClient to update"),
    name: z.string().optional().describe("New name"),
    provider: z.string().describe("Authentication provider"),
    formType: z.string().optional().describe("Form type"),
    enableJWT: z.boolean().optional().describe("Enable JWT authentication"),
    published: z.boolean().optional().describe("Whether the iClient is published"),
  },
  handler: async ({ iclientId, ...updates }, context) => {
    const response = await api.put<IClient>(
      `/iclients/${iclientId}`,
      context.accessToken,
      context.region,
      updates
    );
    return filterCeligoResponse(response.data);
  }
});
