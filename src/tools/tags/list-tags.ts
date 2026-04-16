import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { Tag } from "../../types.js";
import { createTool } from "../helpers.js";

export const listTags = createTool({
  name: "list_tags",
  description: "List all organizational tags.",
  inputSchema: {},
  handler: async (_params, context) => {
    const response = await api.get<Tag[]>(
      '/tags',
      context.accessToken,
      context.region
    );
    return filterCeligoResponse(response.data);
  }
});
