import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { Flow } from "../../types.js";
import { createTool } from "../helpers.js";
import { jsonPatchOperationSchema } from "../_shared/schemas.js";

export const patchFlow = createTool({
  name: "patch_flow",
  description: "Apply JSON Patch operations to a flow (RFC 6902).",
  inputSchema: {
    flowId: z.string().describe("The ID of the flow to patch"),
    operations: jsonPatchOperationSchema,
  },
  handler: async ({ flowId, operations }, context) => {
    const response = await api.patch<Flow>(
      `/flows/${flowId}`,
      context.accessToken,
      context.region,
      operations
    );
    return filterCeligoResponse(response.data);
  }
});
