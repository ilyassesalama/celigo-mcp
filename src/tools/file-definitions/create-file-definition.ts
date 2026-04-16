import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { FileDefinition } from "../../types.js";
import { createTool } from "../helpers.js";

export const createFileDefinition = createTool({
  name: "create_file_definition",
  description: "Create a new file definition for structured data format.",
  inputSchema: {
    name: z.string().describe("Name of the file definition"),
    format: z.string().describe("File format (e.g., 'delimited', 'fixed')"),
    rules: z.record(z.any()).describe("Parsing/generation rules"),
    version: z.string().optional().describe("Version of the definition"),
    delimited: z.record(z.any()).optional().describe("Delimited format options"),
    fixed: z.record(z.any()).optional().describe("Fixed-width format options"),
  },
  handler: async (params, context) => {
    const response = await api.post<FileDefinition>(
      '/filedefinitions',
      context.accessToken,
      context.region,
      params
    );
    return filterCeligoResponse(response.data);
  }
});
