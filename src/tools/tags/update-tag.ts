import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { Tag } from "../../types.js";
import { createTool } from "../helpers.js";

export const updateTag = createTool({
  name: "update_tag",
  description: "Update an existing tag.",
  inputSchema: {
    tagId: z.string().describe("The ID of the tag to update"),
    tag: z.string().describe("The updated tag text"),
  },
  handler: async ({ tagId, tag }, context) => {
    const response = await api.put<Tag>(
      `/tags/${tagId}`,
      context.accessToken,
      context.region,
      { tag }
    );
    return filterCeligoResponse(response.data);
  }
});
