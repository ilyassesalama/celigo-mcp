import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { Tag } from "../../types.js";
import { createTool } from "../helpers.js";

export const createTag = createTool({
  name: "create_tag",
  description: "Create a new organizational tag.",
  inputSchema: {
    tag: z.string().describe("The tag text"),
  },
  handler: async ({ tag }, context) => {
    const response = await api.post<Tag>(
      '/tags',
      context.accessToken,
      context.region,
      { tag }
    );
    return filterCeligoResponse(response.data);
  }
});
