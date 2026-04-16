import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const inviteMultipleUsers = createTool({
  name: "invite_multiple_users",
  description: "Invite multiple users to the account at once.",
  inputSchema: {
    emails: z.array(z.string()).describe("Array of email addresses to invite"),
    accessLevel: z.string().optional().describe("Account access level for all invited users"),
    integrationAccessLevel: z.array(z.record(z.any())).optional().describe("Per-integration access levels for all users"),
  },
  handler: async (params, context) => {
    const response = await api.post(
      '/ashares/bulk',
      context.accessToken,
      context.region,
      params
    );
    return filterCeligoResponse(response.data);
  }
});
