import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const listAuditLogs = createTool({
  name: "list_audit_logs",
  description: "Retrieve audit logs across all resources.",
  inputSchema: {},
  handler: async (_params, context) => {
    const response = await api.get(
      '/audit',
      context.accessToken,
      context.region
    );
    return filterCeligoResponse(response.data);
  }
});
