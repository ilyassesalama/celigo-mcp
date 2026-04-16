import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { ImportConfig } from "../../types.js";
import { createTool } from "../helpers.js";
import { jsonPatchOperationSchema } from "../_shared/schemas.js";

export const patchImport = createTool({
  name: "patch_import",
  description: "Apply JSON Patch operations to an import (RFC 6902).",
  inputSchema: {
    importId: z.string().describe("The ID of the import to patch"),
    operations: jsonPatchOperationSchema,
  },
  handler: async ({ importId, operations }, context) => {
    const response = await api.patch<ImportConfig>(
      `/imports/${importId}`,
      context.accessToken,
      context.region,
      operations
    );
    return filterCeligoResponse(response.data);
  }
});
