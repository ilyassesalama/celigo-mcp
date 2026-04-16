import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const generateStructuredFile = createTool({
  name: "generate_structured_file",
  description: "Convert JSON data to a structured file format (delimited or fixed-width).",
  inputSchema: {
    data: z.array(z.any()).optional().describe("JSON data to convert"),
    rules: z.record(z.any()).describe("Generation rules defining the output format"),
  },
  handler: async (params, context) => {
    const response = await api.post(
      '/data/generate/structured',
      context.accessToken,
      context.region,
      params
    );
    return filterCeligoResponse(response.data);
  }
});
