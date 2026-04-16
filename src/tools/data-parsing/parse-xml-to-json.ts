import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const parseXmlToJson = createTool({
  name: "parse_xml_to_json",
  description: "Convert XML data to JSON format.",
  inputSchema: {
    data: z.string().describe("XML string data to parse"),
  },
  handler: async ({ data }, context) => {
    const response = await api.post(
      '/data/parse/xml',
      context.accessToken,
      context.region,
      { data }
    );
    return filterCeligoResponse(response.data);
  }
});
