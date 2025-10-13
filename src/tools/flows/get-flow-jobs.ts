import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

interface FlowJob {
  _id: string;
  _flowId: string;
  startDateTime: string;
  endDateTime?: string;
  status: 'queued' | 'running' | 'completed' | 'failed' | 'cancelled';
  recordsProcessed?: number;
  errorsCount?: number;
  mode?: string;
}

export const getFlowJobs = createTool({
  name: "get_flow_jobs",
  description: `Get the latest execution jobs for a flow.

Returns recent job executions with details including:
- Job ID and flow ID
- Start and end timestamps
- Execution status (queued, running, completed, failed, cancelled)
- Number of records processed
- Error counts
- Execution mode

Useful for:
- Monitoring flow execution history
- Debugging failed runs
- Performance analysis
- Tracking data processing volumes
- Identifying patterns in failures

Example:
{
  "flowId": "flow123",
  "limit": 10
}`,
  inputSchema: {
    flowId: z.string().describe("The ID of the flow"),
    limit: z.number().optional().describe("Maximum number of jobs to return (default: 10)"),
  },
  handler: async ({ flowId, limit }, context) => {
    let endpoint = `/flows/${flowId}/jobs/latest`;
    if (limit) {
      endpoint += `?limit=${limit}`;
    }

    const response = await api.get<FlowJob[]>(
      endpoint,
      context.accessToken,
      context.region
    );
    return filterCeligoResponse(response.data);
  }
});

