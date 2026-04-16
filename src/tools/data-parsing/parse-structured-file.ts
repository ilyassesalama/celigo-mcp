import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const parseStructuredFile = createTool({
  name: "parse_structured_file",
  description: "Convert a structured file (delimited or fixed-width) to JSON using parsing rules.",
  inputSchema: {
    data: z.string().describe("File content string to parse"),
    rules: z.record(z.any()).describe("Parsing rules defining the file structure"),
  },
  handler: async (params, context) => {
    const response = await api.post(
      '/processors/structuredFileParser',
      context.accessToken,
      context.region,
      params
    );
    return filterCeligoResponse(response.data);
  }
});
