import { z } from "zod";

export const hookSchema = z.object({
  function: z.string(),
  _scriptId: z.string(),
});

export const exportResponseMappingSchema = z.object({
  fields: z.array(z.object({
    extract: z.string(),
    generate: z.string(),
  })),
  lists: z.array(z.object({
    extract: z.string(),
    generate: z.string(),
  })),
});

export const importResponseMappingSchema = z.object({
  fields: z.array(z.object({
    extract: z.enum(['id', 'statusCode']),
    generate: z.string(),
  })),
  lists: z.array(z.object({
    extract: z.string(),
    generate: z.string(),
  })),
});

export const exportProcessorSchema = z.object({
  type: z.literal('export'),
  _exportId: z.string(),
  proceedOnFailure: z.boolean().optional(),
  responseMapping: exportResponseMappingSchema,
  hooks: z.object({
    postResponseMap: hookSchema,
  }).optional(),
});

export const importProcessorSchema = z.object({
  type: z.literal('import'),
  _importId: z.string(),
  proceedOnFailure: z.boolean().optional(),
  responseMapping: importResponseMappingSchema.optional(),
});

export const pageProcessorSchema = z.discriminatedUnion('type', [
  exportProcessorSchema,
  importProcessorSchema,
]);
