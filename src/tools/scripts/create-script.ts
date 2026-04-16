import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { Script } from "../../types.js";
import { createTool } from "../helpers.js";

export const createScript = createTool({
  name: "create_script",
  description: "Create a new custom JavaScript script for use in hooks and transformations.",
  inputSchema: {
    name: z.string().describe("Name of the script"),
    content: z.string().optional().describe("JavaScript content of the script"),
    sandbox: z.boolean().optional().describe("Whether this is a sandbox script"),
    description: z.string().optional().describe("Description of what the script does"),
  },
  handler: async ({ name, content, sandbox, description }, context) => {
    const response = await api.post<Script>(
      '/scripts',
      context.accessToken,
      context.region,
      { name, ...(content !== undefined && { content }), ...(sandbox !== undefined && { sandbox }), ...(description !== undefined && { description }) }
    );
    return filterCeligoResponse(response.data);
  }
});
