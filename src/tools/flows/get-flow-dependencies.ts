import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

interface FlowDependency {
  type: 'export' | 'import' | 'connection' | 'script' | 'integration';
  _id: string;
  name?: string;
  description?: string;
}

export const getFlowDependencies = createTool({
  name: "get_flow_dependencies",
  description: `Get all resources used or referenced by a flow.

Returns a list of all dependencies including:
- Exports (page generators and lookups)
- Imports (destinations)
- Connections (for exports and imports)
- Scripts (hooks and transformations)
- Integration (parent integration)

Useful for:
- Understanding flow architecture
- Impact analysis before making changes
- Identifying broken dependencies
- Documentation and diagramming
- Planning migrations or updates

Example:
{
  "flowId": "flow123"
}`,
  inputSchema: {
    flowId: z.string().describe("The ID of the flow"),
  },
  handler: async ({ flowId }, context) => {
    const response = await api.get<{ dependencies: FlowDependency[] }>(
      `/flows/${flowId}/dependencies`,
      context.accessToken,
      context.region
    );
    return filterCeligoResponse(response.data);
  }
});

