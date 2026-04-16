import { z } from "zod";
import type { ToolAnnotations } from "@modelcontextprotocol/sdk/types.js";
import { ToolContext } from "./context.js";

export interface ToolDefinition {
  name: string;
  /**
   * Optional human-readable display title for the tool. MCP clients may show
   * this in place of the machine-readable `name`.
   */
  title?: string;
  description: string;
  inputSchema: Record<string, z.ZodType<any>>;
  /**
   * Optional behavioural hints for clients (readOnlyHint, destructiveHint,
   * idempotentHint, openWorldHint). Advisory only.
   */
  annotations?: ToolAnnotations;
  handler: (params: any, context: ToolContext) => Promise<any>;
}

export function createTool(definition: ToolDefinition) {
  return (context: ToolContext) => {
    context.server.registerTool(
      definition.name,
      {
        title: definition.title,
        description: definition.description,
        inputSchema: definition.inputSchema,
        annotations: definition.annotations,
      },
      async (params: any) => {
        try {
          const result = await definition.handler(params, context);
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(result, null, 2),
              },
            ],
          };
        } catch (error) {
          const errorText = error instanceof Error ? error.message : String(error);
          return {
            isError: true,
            content: [{ type: "text", text: `Error: ${errorText}` }],
          };
        }
      }
    );
  };
}
