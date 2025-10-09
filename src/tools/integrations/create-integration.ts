import { z } from "zod";
import { api } from "../../api.js";
import { Integration } from "../../types.js";
import { createTool } from "../helpers.js";

export const createIntegration = createTool({
  name: "create_integration",
  description: "Create a new Celigo integration",
  inputSchema: {
    name: z.string().describe("Name of the integration"),
    config: z.record(z.any()).optional().describe("Additional integration configuration"),
  },
  handler: async ({ name, config }, context) => {
    const integrationData = {
      name,
      ...config,
    };

    const response = await api.post<Integration>(
      '/integrations',
      context.accessToken,
      context.region,
      integrationData
    );
    return response.data;
  }
});

