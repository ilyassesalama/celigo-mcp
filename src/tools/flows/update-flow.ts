import { z } from "zod";
import { api } from "../../api.js";
import { Flow } from "../../types.js";
import { createTool } from "../helpers.js";

// Zod schema for flow configuration validation (reused from create-flow)
const hookSchema = z.object({
  function: z.string(),
  _scriptId: z.string(),
});

const exportResponseMappingSchema = z.object({
  fields: z.array(z.object({
    extract: z.string(),
    generate: z.string(),
  })),
  lists: z.array(z.object({
    extract: z.string(),
    generate: z.string(),
  })),
});

const importResponseMappingSchema = z.object({
  fields: z.array(z.object({
    extract: z.enum(['id', 'statusCode']),
    generate: z.string(),
  })),
  lists: z.array(z.object({
    extract: z.string(),
    generate: z.string(),
  })),
});

const exportProcessorSchema = z.object({
  type: z.literal('export'),
  _exportId: z.string(),
  proceedOnFailure: z.boolean().optional(),
  responseMapping: exportResponseMappingSchema,
  hooks: z.object({
    postResponseMap: hookSchema,
  }).optional(),
});

const importProcessorSchema = z.object({
  type: z.literal('import'),
  _importId: z.string(),
  proceedOnFailure: z.boolean().optional(),
  responseMapping: importResponseMappingSchema.optional(),
});

const pageProcessorSchema = z.discriminatedUnion('type', [
  exportProcessorSchema,
  importProcessorSchema,
]);

export const updateFlow = createTool({
  name: "update_flow",
  description: `Update an existing Celigo flow with new configuration.

CRITICAL: The 'sandbox' field MUST match ALL referenced components (exports, imports, integration)!

Updates the complete flow configuration including pageGenerators and pageProcessors.
All fields will be replaced with the new configuration.

Example:
{
  "flowId": "flow123",
  "config": {
    "name": "Updated Sales Order Sync",
    "_integrationId": "integration123",
    "_flowGroupingId": "group123",
    "sandbox": true,
    "disabled": false,
    "pageGenerators": [
      {
        "_exportId": "export123",
        "skipRetries": false
      }
    ],
    "pageProcessors": [
      {
        "type": "import",
        "_importId": "import123"
      }
    ]
  }
}`,
  inputSchema: {
    flowId: z.string().describe("The ID of the flow to update"),
    config: z.object({
      name: z.string().describe("Name of the flow"),
      _integrationId: z.string().describe("The ID of the integration this flow belongs to"),
      _flowGroupingId: z.string().describe("The ID of the flow grouping"),
      pageGenerators: z.array(z.object({
        _exportId: z.string(),
        skipRetries: z.boolean().optional(),
      })).min(1).describe("Array of page generators (exports)"),
      pageProcessors: z.array(pageProcessorSchema).min(1).describe("Array of page processors (exports for lookups, imports for destination)"),
      free: z.boolean().optional().describe("Whether the flow is free (default: false)"),
      disabled: z.boolean().optional().describe("Whether the flow is disabled"),
      sandbox: z.boolean().optional().describe("Whether this is a sandbox flow - MUST match all referenced components"),
    }).describe("The updated flow configuration"),
  },
  handler: async ({ flowId, config }, context) => {
    const response = await api.put<Flow>(
      `/flows/${flowId}`,
      context.accessToken,
      context.region,
      config as any
    );
    return response.data;
  }
});

