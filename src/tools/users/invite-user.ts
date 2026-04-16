import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { UserShare } from "../../types.js";
import { createTool } from "../helpers.js";

export const inviteUser = createTool({
  name: "invite_user",
  description: "Invite a single user to the account with specified access level.",
  inputSchema: {
    email: z.string().describe("Email address of the user to invite"),
    accountAccessLevel: z.string().optional().describe("Account-level access (e.g., 'administrator', 'manage', 'monitor')"),
    integrationAccessLevel: z.array(z.record(z.any())).optional().describe("Per-integration access levels"),
  },
  handler: async (params, context) => {
    const response = await api.post<UserShare>(
      '/invite',
      context.accessToken,
      context.region,
      params
    );
    return filterCeligoResponse(response.data);
  }
});
