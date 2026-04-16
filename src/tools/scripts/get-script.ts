import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { Script } from "../../types.js";
import { createTool } from "../helpers.js";

export const getScript = createTool({
  name: "get_script",
  description: "Get a specific script by ID.",
  inputSchema: {
    scriptId: z.string().describe("The ID of the script to retrieve"),
  },
  handler: async ({ scriptId }, context) => {
    const response = await api.get<Script>(
      `/scripts/${scriptId}`,
      context.accessToken,
      context.region
    );
    return filterCeligoResponse(response.data);
  }
});
