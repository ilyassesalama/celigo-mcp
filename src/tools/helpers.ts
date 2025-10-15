import { z } from "zod";
import { ToolContext } from "./context.js";

export interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: Record<string, z.ZodType<any>>;
  handler: (params: any, context: ToolContext) => Promise<any>;
}

export function createTool(definition: ToolDefinition) {
  return (context: ToolContext) => {
    context.server.tool(
      definition.name,
      definition.description,
      definition.inputSchema,
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
            content: [{ type: "text", text: `Error: ${errorText}` }]
          };
        }
      }
    );
  };
}

