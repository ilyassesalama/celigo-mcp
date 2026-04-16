import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { Connection } from "../../types.js";
import { createTool } from "../helpers.js";
import { jsonPatchOperationSchema } from "../_shared/schemas.js";

export const patchConnection = createTool({
  name: "patch_connection",
  description: "Apply JSON Patch operations to a connection (RFC 6902).",
  inputSchema: {
    connectionId: z.string().describe("The ID of the connection to patch"),
    operations: jsonPatchOperationSchema,
  },
  handler: async ({ connectionId, operations }, context) => {
    const response = await api.patch<Connection>(
      `/connections/${connectionId}`,
      context.accessToken,
      context.region,
      operations
    );
    return filterCeligoResponse(response.data);
  }
});
