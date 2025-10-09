import { api } from "../../api.js";
import { TokenInfo } from "../../types.js";
import { createTool } from "../helpers.js";

export const validateToken = createTool({
  name: "validate_token",
  description: "Validate the Celigo API token and get user information",
  inputSchema: {},
  handler: async (_, context) => {
    const response = await api.get<TokenInfo>('/tokenInfo', context.accessToken, context.region);
    return {
      valid: true,
      userId: response.data._userId,
      scope: response.data.scope,
      email: response.data.email
    };
  }
});

