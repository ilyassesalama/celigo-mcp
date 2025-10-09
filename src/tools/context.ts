import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CeligoRegion } from "../types.js";

export interface ToolContext {
  server: McpServer;
  accessToken: string;
  region: CeligoRegion;
}

export type ToolRegistrationFunction = (context: ToolContext) => void;

