import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { Tag } from "../../types.js";
import { createTool } from "../helpers.js";

export const getTag = createTool({
  name: "get_tag",
  description: "Get a specific tag by ID.",
  inputSchema: {
    tagId: z.string().describe("The ID of the tag to retrieve"),
  },
  handler: async ({ tagId }, context) => {
    const response = await api.get<Tag>(
      `/tags/${tagId}`,
      context.accessToken,
      context.region
    );
    return filterCeligoResponse(response.data);
  }
});
