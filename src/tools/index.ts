import { ToolContext } from "./context.js";

// Token tools
import { validateToken } from "./token/validate-token.js";

// Integration tools
import { createIntegration } from "./integrations/create-integration.js";
import { deleteIntegration } from "./integrations/delete-integration.js";
import { getIntegration } from "./integrations/get-integration.js";
import { listIntegrations } from "./integrations/list-integrations.js";
import { updateIntegration } from "./integrations/update-integration.js";
import { getIntegrationAudit } from "./integrations/get-integration-audit.js";
import { getIntegrationConnections } from "./integrations/get-integration-connections.js";
import { getIntegrationDependencies } from "./integrations/get-integration-dependencies.js";
import { getIntegrationErrors } from "./integrations/get-integration-errors.js";
import { getIntegrationExports } from "./integrations/get-integration-exports.js";
import { getIntegrationImports } from "./integrations/get-integration-imports.js";
import { getIntegrationTemplate } from "./integrations/get-integration-template.js";
import { getIntegrationUsers } from "./integrations/get-integration-users.js";
import { createIntegrationRevision } from "./integrations/create-integration-revision.js";
import { cloneIntegration } from "./integrations/clone-integration.js";
import { patchIntegration } from "./integrations/patch-integration.js";

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
import { getFlowDescendants } from "./flows/get-flow-descendants.js";
import { getFlowLastExportDatetime } from "./flows/get-flow-last-export-datetime.js";
import { getFlowTemplate } from "./flows/get-flow-template.js";
import { getResolvedErrors } from "./flows/get-resolved-errors.js";
import { deleteResolvedErrors } from "./flows/delete-resolved-errors.js";
import { resolveErrors } from "./flows/resolve-errors.js";
import { retryErrors } from "./flows/retry-errors.js";
import { updateFlowErrorTags } from "./flows/update-flow-error-tags.js";
import { assignExportError } from "./flows/assign-export-error.js";
import { patchFlow } from "./flows/patch-flow.js";

// Connection tools
import { createConnection } from "./connections/create-connection.js";
import { deleteConnection } from "./connections/delete-connection.js";
import { getConnection } from "./connections/get-connection.js";
import { listConnections } from "./connections/list-connections.js";
import { updateConnection } from "./connections/update-connection.js";
import { getConnectionAudit } from "./connections/get-connection-audit.js";
import { getConnectionDebugLogs } from "./connections/get-connection-debug-logs.js";
import { getConnectionDependencies } from "./connections/get-connection-dependencies.js";
import { pingConnection } from "./connections/ping-connection.js";
import { registerConnection } from "./connections/register-connection.js";
import { registerConnectionsBulk } from "./connections/register-connections-bulk.js";
import { unregisterConnection } from "./connections/unregister-connection.js";
import { patchConnection } from "./connections/patch-connection.js";
import { testVirtualConnection } from "./connections/test-virtual-connection.js";

// Export tools
import { createExport } from "./exports/create-export.js";
import { deleteExport } from "./exports/delete-export.js";
import { getExport } from "./exports/get-export.js";
import { listExports } from "./exports/list-exports.js";
import { updateExport } from "./exports/update-export.js";
import { getExportAudit } from "./exports/get-export-audit.js";
import { cloneExport } from "./exports/clone-export.js";
import { executeVirtualExport } from "./exports/execute-virtual-export.js";
import { exportVirtualPaged } from "./exports/export-virtual-paged.js";
import { patchExport } from "./exports/patch-export.js";

// Import tools
import { createImport } from "./imports/create-import.js";
import { deleteImport } from "./imports/delete-import.js";
import { getImport } from "./imports/get-import.js";
import { listImports } from "./imports/list-imports.js";
import { updateImport } from "./imports/update-import.js";
import { getImportAudit } from "./imports/get-import-audit.js";
import { getImportDependencies } from "./imports/get-import-dependencies.js";
import { cloneImport } from "./imports/clone-import.js";
import { executeVirtualImport } from "./imports/execute-virtual-import.js";
import { evaluateVirtualImportMap } from "./imports/evaluate-virtual-import-map.js";
import { invokeImport } from "./imports/invoke-import.js";
import { patchImport } from "./imports/patch-import.js";

// Script tools
import { createScript } from "./scripts/create-script.js";
import { getScript } from "./scripts/get-script.js";
import { updateScript } from "./scripts/update-script.js";
import { deleteScript } from "./scripts/delete-script.js";
import { getScriptLogs } from "./scripts/get-script-logs.js";

// Tag tools
import { createTag } from "./tags/create-tag.js";
import { getTag } from "./tags/get-tag.js";
import { updateTag } from "./tags/update-tag.js";
import { deleteTag } from "./tags/delete-tag.js";
import { listTags } from "./tags/list-tags.js";

// User tools
import { getUser } from "./users/get-user.js";
import { listUsers } from "./users/list-users.js";
import { updateUser } from "./users/update-user.js";
import { deleteUser } from "./users/delete-user.js";
import { inviteUser } from "./users/invite-user.js";
import { inviteMultipleUsers } from "./users/invite-multiple-users.js";

// iClient tools
import { createIClient } from "./iclients/create-iclient.js";
import { getIClient } from "./iclients/get-iclient.js";
import { updateIClient } from "./iclients/update-iclient.js";
import { deleteIClient } from "./iclients/delete-iclient.js";
import { listIClients } from "./iclients/list-iclients.js";

// State tools
import { getStateValue } from "./state/get-state-value.js";
import { upsertStateValue } from "./state/upsert-state-value.js";
import { deleteStateValue } from "./state/delete-state-value.js";
import { deleteAllState } from "./state/delete-all-state.js";
import { listStateKeys } from "./state/list-state-keys.js";
import { getResourceStateValue } from "./state/get-resource-state-value.js";
import { upsertResourceStateValue } from "./state/upsert-resource-state-value.js";
import { deleteResourceStateValue } from "./state/delete-resource-state-value.js";
import { deleteAllResourceState } from "./state/delete-all-resource-state.js";
import { listResourceState } from "./state/list-resource-state.js";

// File Definition tools
import { createFileDefinition } from "./file-definitions/create-file-definition.js";
import { getFileDefinition } from "./file-definitions/get-file-definition.js";
import { listFileDefinitions } from "./file-definitions/list-file-definitions.js";

// Data Parsing tools
import { parseCsvToJson } from "./data-parsing/parse-csv-to-json.js";
import { parseXmlToJson } from "./data-parsing/parse-xml-to-json.js";
import { parseStructuredFile } from "./data-parsing/parse-structured-file.js";
import { generateStructuredFile } from "./data-parsing/generate-structured-file.js";

// Misc tools
import { getEdiProfiles } from "./misc/get-edi-profiles.js";
import { listAuditLogs } from "./misc/list-audit-logs.js";
import { listJobs } from "./misc/list-jobs.js";
import { listLicenses } from "./misc/list-licenses.js";

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
  getIntegrationAudit(context);
  getIntegrationConnections(context);
  getIntegrationDependencies(context);
  getIntegrationErrors(context);
  getIntegrationExports(context);
  getIntegrationImports(context);
  getIntegrationTemplate(context);
  getIntegrationUsers(context);
  createIntegrationRevision(context);
  cloneIntegration(context);
  patchIntegration(context);

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
  getFlowDescendants(context);
  getFlowLastExportDatetime(context);
  getFlowTemplate(context);
  getResolvedErrors(context);
  deleteResolvedErrors(context);
  resolveErrors(context);
  retryErrors(context);
  updateFlowErrorTags(context);
  assignExportError(context);
  patchFlow(context);
  deleteFlow(context);

  // Connection tools
  listConnections(context);
  getConnection(context);
  createConnection(context);
  updateConnection(context);
  deleteConnection(context);
  getConnectionAudit(context);
  getConnectionDebugLogs(context);
  getConnectionDependencies(context);
  pingConnection(context);
  registerConnection(context);
  registerConnectionsBulk(context);
  unregisterConnection(context);
  patchConnection(context);
  testVirtualConnection(context);

  // Export tools
  listExports(context);
  getExport(context);
  createExport(context);
  updateExport(context);
  deleteExport(context);
  getExportAudit(context);
  cloneExport(context);
  executeVirtualExport(context);
  exportVirtualPaged(context);
  patchExport(context);

  // Import tools
  listImports(context);
  getImport(context);
  createImport(context);
  updateImport(context);
  deleteImport(context);
  getImportAudit(context);
  getImportDependencies(context);
  cloneImport(context);
  executeVirtualImport(context);
  evaluateVirtualImportMap(context);
  invokeImport(context);
  patchImport(context);

  // Script tools
  createScript(context);
  getScript(context);
  updateScript(context);
  deleteScript(context);
  getScriptLogs(context);

  // Tag tools
  createTag(context);
  getTag(context);
  updateTag(context);
  deleteTag(context);
  listTags(context);

  // User tools
  getUser(context);
  listUsers(context);
  updateUser(context);
  deleteUser(context);
  inviteUser(context);
  inviteMultipleUsers(context);

  // iClient tools
  createIClient(context);
  getIClient(context);
  updateIClient(context);
  deleteIClient(context);
  listIClients(context);

  // State tools
  getStateValue(context);
  upsertStateValue(context);
  deleteStateValue(context);
  deleteAllState(context);
  listStateKeys(context);
  getResourceStateValue(context);
  upsertResourceStateValue(context);
  deleteResourceStateValue(context);
  deleteAllResourceState(context);
  listResourceState(context);

  // File Definition tools
  createFileDefinition(context);
  getFileDefinition(context);
  listFileDefinitions(context);

  // Data Parsing tools
  parseCsvToJson(context);
  parseXmlToJson(context);
  parseStructuredFile(context);
  generateStructuredFile(context);

  // Misc tools
  getEdiProfiles(context);
  listAuditLogs(context);
  listJobs(context);
  listLicenses(context);
}

export * from "./context.js";
