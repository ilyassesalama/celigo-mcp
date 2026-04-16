import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { FileDefinition } from "../../types.js";
import { createTool } from "../helpers.js";

export const listFileDefinitions = createTool({
  name: "list_file_definitions",
  description: "List all file definitions.",
  inputSchema: {},
  handler: async (_params, context) => {
    const response = await api.get<FileDefinition[]>(
      '/filedefinitions',
      context.accessToken,
      context.region
    );
    return filterCeligoResponse(response.data);
  }
});
