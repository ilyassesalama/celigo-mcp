import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { UserShare } from "../../types.js";
import { createTool } from "../helpers.js";

export const getUser = createTool({
  name: "get_user",
  description: "Get a specific user share by ID.",
  inputSchema: {
    userId: z.string().describe("The ID of the user share to retrieve"),
  },
  handler: async ({ userId }, context) => {
    const response = await api.get<UserShare>(
      `/ashares/${userId}`,
      context.accessToken,
      context.region
    );
    return filterCeligoResponse(response.data);
  }
});
