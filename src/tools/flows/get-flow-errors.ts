import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

interface CeligoError {
  occurredAt: string;
  source: string;
  code: string;
  message: string;
  traceKey: string;
  retryDataKey: string;
  errorId: string;
  _flowJobId: string;
  classification?: string;
}

export const getFlowErrors = createTool({
  name: "get_flow_errors",
  description: `Get execution errors for a specific flow.

Retrieves error logs from flow executions, including:
- Error messages and codes
- Timestamp of occurrence
- Trace keys for debugging
- Retry data keys for reprocessing
- Job IDs for context

Useful for:
- Debugging failed flow executions
- Monitoring integration health
- Identifying patterns in failures
- Getting retry keys for error recovery

Example:
{
  "flowId": "flow123",
  "exportId": "export456",
  "limit": 50,
  "occurredAfter": "2024-01-01T00:00:00Z"
}`,
  inputSchema: {
    flowId: z.string().describe("The ID of the flow"),
    exportId: z.string().optional().describe("Filter by specific export ID"),
    importId: z.string().optional().describe("Filter by specific import ID"),
    limit: z.number().optional().describe("Maximum number of errors to return (default: 50)"),
    occurredAfter: z.string().optional().describe("Filter errors after this date (ISO format, e.g., '2024-01-01T00:00:00Z')"),
    occurredBefore: z.string().optional().describe("Filter errors before this date (ISO format)"),
    source: z.string().optional().describe("Filter by error source (e.g., 'application', 'system')"),
  },
  handler: async ({ flowId, exportId, importId, limit, occurredAfter, occurredBefore, source }, context) => {
    const expOrImpId = exportId || importId;
    if (!expOrImpId) {
      throw new Error('Either exportId or importId must be specified');
    }

    const params: string[] = [];
    if (limit) params.push(`limit=${limit}`);
    if (occurredAfter) params.push(`occurredAt_gte=${encodeURIComponent(occurredAfter)}`);
    if (occurredBefore) params.push(`occurredAt_lte=${encodeURIComponent(occurredBefore)}`);
    if (source) params.push(`source=${encodeURIComponent(source)}`);

    const qs = params.length ? `?${params.join('&')}` : '';
    const endpoint = `/flows/${flowId}/${expOrImpId}/errors${qs}`;

    const response = await api.get<{ errors: CeligoError[] }>(
      endpoint,
      context.accessToken,
      context.region
    );

    return filterCeligoResponse(response.data);
  }
});

