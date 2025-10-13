import { z } from "zod";
import { api } from "../../api.js";
import { Flow } from "../../types.js";
import { createTool } from "../helpers.js";

// Zod schema for flow configuration validation
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

export const createFlow = createTool({
  name: "create_flow",
  description: `Create a new Celigo flow with source and destination configurations.

CRITICAL: The 'sandbox' field MUST match ALL referenced components (exports, imports, integration)!

A flow consists of:
- pageGenerators: Source exports that generate data pages
- pageProcessors: Lookups (export processors) and destination imports (import processors)

Page processors can be:
1. Export processors (lookups): Fetch additional data, can have hooks if not last
2. Import processors (destination): Always last, sends data to destination

Example configuration:
{
  "name": "Sales Order Sync",
  "_integrationId": "integration123",
  "_flowGroupingId": "group123",
  "sandbox": true,
  "pageGenerators": [
    {
      "_exportId": "export123",
      "skipRetries": false
    }
  ],
  "pageProcessors": [
    {
      "type": "export",
      "_exportId": "lookup123",
      "responseMapping": {
        "fields": [{ "extract": "data[0].id", "generate": "orderId" }],
        "lists": []
      }
    },
    {
      "type": "import",
      "_importId": "import123"
    }
  ]
}`,
  inputSchema: {
    name: z.string().describe("Name of the flow"),
    _integrationId: z.string().describe("The ID of the integration this flow belongs to"),
    _flowGroupingId: z.string().optional().describe("The ID of the flow grouping (optional)"),
    pageGenerators: z.array(z.object({
      _exportId: z.string(),
      skipRetries: z.boolean().optional(),
    })).min(1).describe("Array of page generators (exports)"),
    pageProcessors: z.array(pageProcessorSchema).min(1).describe("Array of page processors (exports for lookups, imports for destination)"),
    free: z.boolean().optional().describe("Whether the flow is free (default: false)"),
    disabled: z.boolean().optional().describe("Whether the flow is disabled (default: true)"),
    sandbox: z.boolean().optional().describe("Whether this is a sandbox flow - MUST match all referenced components"),
  },
  handler: async (config, context) => {
    const response = await api.post<Flow>(
      '/flows',
      context.accessToken,
      context.region,
      config as any
    );
    return response.data;
  }
});

