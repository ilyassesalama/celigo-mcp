import { z } from "zod";

export const jsonPatchOperationSchema = z.array(z.object({
  op: z.enum(['add', 'remove', 'replace', 'move', 'copy', 'test']),
  path: z.string(),
  value: z.any().optional(),
  from: z.string().optional(),
})).describe("Array of JSON Patch operations (RFC 6902)");
