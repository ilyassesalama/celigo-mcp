import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { FileDefinition } from "../../types.js";
import { createTool } from "../helpers.js";

export const getFileDefinition = createTool({
  name: "get_file_definition",
  description: "Get a specific file definition by ID.",
  inputSchema: {
    fileDefinitionId: z.string().describe("The ID of the file definition to retrieve"),
  },
  handler: async ({ fileDefinitionId }, context) => {
    const response = await api.get<FileDefinition>(
      `/filedefinitions/${fileDefinitionId}`,
      context.accessToken,
      context.region
    );
    return filterCeligoResponse(response.data);
  }
});
