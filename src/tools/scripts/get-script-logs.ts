import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const getScriptLogs = createTool({
  name: "get_script_logs",
  description: "Get execution logs for a specific script.",
  inputSchema: {
    scriptId: z.string().describe("The ID of the script"),
  },
  handler: async ({ scriptId }, context) => {
    const response = await api.get(
      `/scripts/${scriptId}/logs`,
      context.accessToken,
      context.region
    );
    return filterCeligoResponse(response.data);
  }
});
