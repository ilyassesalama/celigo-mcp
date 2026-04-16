import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const parseCsvToJson = createTool({
  name: "parse_csv_to_json",
  description: "Convert CSV data to JSON format.",
  inputSchema: {
    data: z.string().describe("CSV string data to parse"),
  },
  handler: async ({ data }, context) => {
    const response = await api.post(
      '/data/parse/csv',
      context.accessToken,
      context.region,
      { data }
    );
    return filterCeligoResponse(response.data);
  }
});
