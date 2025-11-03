import { api } from "../../api.js";
import { TokenInfo } from "../../types.js";
import { createTool } from "../helpers.js";

export const validateToken = createTool({
  name: "validate_token",
  description: "Validate the Celigo API token.",
  inputSchema: {},
  handler: async (_, context) => {
    const response = await api.get<TokenInfo>('/tokenInfo', context.accessToken, context.region);
    return {
      userId: response.data._userId
    };
  }
});

