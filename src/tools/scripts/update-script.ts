import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { Script } from "../../types.js";
import { createTool } from "../helpers.js";

export const updateScript = createTool({
  name: "update_script",
  description: "Update an existing script's content or settings.",
  inputSchema: {
    scriptId: z.string().describe("The ID of the script to update"),
    name: z.string().optional().describe("New name for the script"),
    content: z.string().optional().describe("Updated JavaScript content"),
    sandbox: z.boolean().optional().describe("Whether this is a sandbox script"),
    description: z.string().optional().describe("Updated description"),
  },
  handler: async ({ scriptId, ...updates }, context) => {
    const response = await api.put<Script>(
      `/scripts/${scriptId}`,
      context.accessToken,
      context.region,
      updates
    );
    return filterCeligoResponse(response.data);
  }
});
