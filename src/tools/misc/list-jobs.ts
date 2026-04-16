import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { Job } from "../../types.js";
import { createTool } from "../helpers.js";

export const listJobs = createTool({
  name: "list_jobs",
  description: "List jobs with optional filters for type, status, flow, and date range.",
  inputSchema: {
    type: z.string().optional().describe("Filter by job type"),
    status: z.string().optional().describe("Filter by job status"),
    flowId: z.string().optional().describe("Filter by flow ID"),
    integrationId: z.string().optional().describe("Filter by integration ID"),
    createdAtGte: z.string().optional().describe("Filter jobs created after this date (ISO format)"),
    createdAtLte: z.string().optional().describe("Filter jobs created before this date (ISO format)"),
  },
  handler: async ({ type, status, flowId, integrationId, createdAtGte, createdAtLte }, context) => {
    let endpoint = '/jobs';
    const params: string[] = [];
    if (type) params.push(`type=${type}`);
    if (status) params.push(`status=${status}`);
    if (flowId) params.push(`_flowId=${flowId}`);
    if (integrationId) params.push(`_integrationId=${integrationId}`);
    if (createdAtGte) params.push(`createdAt_gte=${createdAtGte}`);
    if (createdAtLte) params.push(`createdAt_lte=${createdAtLte}`);
    if (params.length > 0) endpoint += `?${params.join('&')}`;

    const response = await api.get<Job[]>(
      endpoint,
      context.accessToken,
      context.region
    );
    return filterCeligoResponse(response.data);
  }
});
