import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { UserShare } from "../../types.js";
import { createTool } from "../helpers.js";

export const updateUser = createTool({
  name: "update_user",
  description: "Update a user's access settings.",
  inputSchema: {
    userId: z.string().describe("The ID of the user share to update"),
    accessLevel: z.string().optional().describe("Account access level"),
    integrationAccessLevel: z.array(z.record(z.any())).optional().describe("Per-integration access levels"),
  },
  handler: async ({ userId, ...updates }, context) => {
    const response = await api.put<UserShare>(
      `/ashares/${userId}`,
      context.accessToken,
      context.region,
      updates
    );
    return filterCeligoResponse(response.data);
  }
});
