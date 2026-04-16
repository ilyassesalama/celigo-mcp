import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { ImportConfig } from "../../types.js";
import { createTool } from "../helpers.js";

export const cloneImport = createTool({
  name: "clone_import",
  description: "Clone an existing import with connection remapping.",
  inputSchema: {
    importId: z.string().describe("The ID of the import to clone"),
    connectionMap: z.record(z.string()).describe("Map of old connection IDs to new connection IDs"),
  },
  handler: async ({ importId, connectionMap }, context) => {
    const response = await api.post<ImportConfig>(
      `/imports/${importId}/clone`,
      context.accessToken,
      context.region,
      { connectionMap }
    );
    return filterCeligoResponse(response.data);
  }
});
