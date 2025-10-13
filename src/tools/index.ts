import { ToolContext } from "./context.js";

// Token tools
import { validateToken } from "./token/validate-token.js";

// Integration tools
import { createIntegration } from "./integrations/create-integration.js";
import { deleteIntegration } from "./integrations/delete-integration.js";
import { getIntegration } from "./integrations/get-integration.js";
import { listIntegrations } from "./integrations/list-integrations.js";
import { updateIntegration } from "./integrations/update-integration.js";

// Flow tools
import { cloneFlow } from "./flows/clone-flow.js";
import { createFlow } from "./flows/create-flow.js";
import { deleteFlow } from "./flows/delete-flow.js";
import { getFlowAudit } from "./flows/get-flow-audit.js";
import { getFlowDependencies } from "./flows/get-flow-dependencies.js";
import { getFlowErrors } from "./flows/get-flow-errors.js";
import { getFlowJobs } from "./flows/get-flow-jobs.js";
import { getFlow } from "./flows/get-flow.js";
import { listFlows } from "./flows/list-flows.js";
import { runFlow } from "./flows/run-flow.js";
import { updateFlow } from "./flows/update-flow.js";

// Connection tools
import { createConnection } from "./connections/create-connection.js";
import { deleteConnection } from "./connections/delete-connection.js";
import { getConnection } from "./connections/get-connection.js";
import { listConnections } from "./connections/list-connections.js";
import { updateConnection } from "./connections/update-connection.js";

// Export tools
import { createExport } from "./exports/create-export.js";
import { deleteExport } from "./exports/delete-export.js";
import { getExport } from "./exports/get-export.js";
import { listExports } from "./exports/list-exports.js";
import { updateExport } from "./exports/update-export.js";

// Import tools
import { createImport } from "./imports/create-import.js";
import { deleteImport } from "./imports/delete-import.js";
import { getImport } from "./imports/get-import.js";
import { listImports } from "./imports/list-imports.js";
import { updateImport } from "./imports/update-import.js";

/**
 * Register all tools with the MCP server
 */
export function registerAllTools(context: ToolContext) {
  // Token tools
  validateToken(context);

  // Integration tools
  listIntegrations(context);
  getIntegration(context);
  createIntegration(context);
  updateIntegration(context);
  deleteIntegration(context);

  // Flow tools
  listFlows(context);
  getFlow(context);
  createFlow(context);
  updateFlow(context);
  cloneFlow(context);
  runFlow(context);
  getFlowErrors(context);
  getFlowAudit(context);
  getFlowDependencies(context);
  getFlowJobs(context);
  deleteFlow(context);

  // Connection tools
  listConnections(context);
  getConnection(context);
  createConnection(context);
  updateConnection(context);
  deleteConnection(context);

  // Export tools
  listExports(context);
  getExport(context);
  createExport(context);
  updateExport(context);
  deleteExport(context);

  // Import tools
  listImports(context);
  getImport(context);
  createImport(context);
  updateImport(context);
  deleteImport(context);
}

export * from "./context.js";
