import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { Integration } from "../../types.js";
import { createTool } from "../helpers.js";
import { jsonPatchOperationSchema } from "../_shared/schemas.js";

export const patchIntegration = createTool({
  name: "patch_integration",
  description: "Apply JSON Patch operations to an integration (RFC 6902).",
  inputSchema: {
    integrationId: z.string().describe("The ID of the integration to patch"),
    operations: jsonPatchOperationSchema,
  },
  handler: async ({ integrationId, operations }, context) => {
    const response = await api.patch<Integration>(
      `/integrations/${integrationId}`,
      context.accessToken,
      context.region,
      operations
    );
    return filterCeligoResponse(response.data);
  }
});
