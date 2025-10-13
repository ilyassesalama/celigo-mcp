import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

interface AuditLog {
  _id: string;
  timestamp: string;
  userId: string;
  userName?: string;
  action: string;
  changes?: Record<string, any>;
}

export const getFlowAudit = createTool({
  name: "get_flow_audit",
  description: `Get audit log for a specific flow.

Returns the history of changes made to a flow including:
- Who made the changes (user ID and name)
- When changes were made (timestamp)
- What action was performed (create, update, delete, etc.)
- Details of what was changed

Useful for:
- Tracking flow modifications over time
- Compliance and auditing
- Debugging unexpected behavior
- Understanding flow evolution

Example:
{
  "flowId": "flow123"
}`,
  inputSchema: {
    flowId: z.string().describe("The ID of the flow"),
  },
  handler: async ({ flowId }, context) => {
    const response = await api.get<{ auditLogs: AuditLog[] }>(
      `/flows/${flowId}/audit`,
      context.accessToken,
      context.region
    );
    return filterCeligoResponse(response.data);
  }
});

