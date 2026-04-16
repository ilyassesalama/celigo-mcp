import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { ExportConfig } from "../../types.js";
import { createTool } from "../helpers.js";
import { jsonPatchOperationSchema } from "../_shared/schemas.js";

export const patchExport = createTool({
  name: "patch_export",
  description: "Apply JSON Patch operations to an export (RFC 6902).",
  inputSchema: {
    exportId: z.string().describe("The ID of the export to patch"),
    operations: jsonPatchOperationSchema,
  },
  handler: async ({ exportId, operations }, context) => {
    const response = await api.patch<ExportConfig>(
      `/exports/${exportId}`,
      context.accessToken,
      context.region,
      operations
    );
    return filterCeligoResponse(response.data);
  }
});
