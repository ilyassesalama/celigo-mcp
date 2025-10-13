import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { Flow } from "../../types.js";
import { createTool } from "../helpers.js";

export const cloneFlow = createTool({
  name: "clone_flow",
  description: `Clone an existing Celigo flow with connection mapping.

Creates a copy of a flow with all its configurations including:
- PageGenerators (source exports)
- PageProcessors (lookups and destination imports)
- Response mappings
- All settings and configurations

IMPORTANT: You must provide a connectionMap that maps ALL existing connection IDs 
to their corresponding connection IDs in the new flow. You can map to the same 
connection ID if you don't want to change it.

Useful for:
- Creating similar flows for different data sets
- Testing modifications without affecting the original
- Deploying flows across environments

Example:
{
  "flowId": "flow123",
  "name": "Cloned Flow Name",
  "_integrationId": "integration456",
  "connectionMap": {
    "oldConnId1": "newConnId1",
    "oldConnId2": "newConnId2"
  },
  "sandbox": false,
  "_flowGroupingId": "group789"
}`,
  inputSchema: {
    flowId: z.string().describe("The ID of the flow to clone"),
    name: z.string().describe("Name for the cloned flow"),
    _integrationId: z.string().describe("Integration ID where the cloned flow should be placed"),
    connectionMap: z.record(z.string()).describe("Map of existing connection IDs to new connection IDs - MUST map ALL connections in the flow"),
    sandbox: z.boolean().optional().describe("Whether the cloned flow should be in sandbox mode"),
    _flowGroupingId: z.string().optional().describe("Flow grouping ID where the cloned flow should be placed (optional)"),
  },
  handler: async ({ flowId, name, _integrationId, connectionMap, sandbox, _flowGroupingId }, context) => {
    const cloneData = {
      name,
      _integrationId,
      connectionMap,
      ...(sandbox !== undefined && { sandbox }),
      ...(_flowGroupingId && { _flowGroupingId }),
    };

    const response = await api.post<Flow>(
      `/flows/${flowId}/clone`,
      context.accessToken,
      context.region,
      cloneData
    );
    return filterCeligoResponse(response.data);
  }
});

