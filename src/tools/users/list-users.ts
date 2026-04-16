import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { UserShare } from "../../types.js";
import { createTool } from "../helpers.js";

export const listUsers = createTool({
  name: "list_users",
  description: "List all account users/shares.",
  inputSchema: {},
  handler: async (_params, context) => {
    const response = await api.get<UserShare[]>(
      '/ashares',
      context.accessToken,
      context.region
    );
    return filterCeligoResponse(response.data);
  }
});
