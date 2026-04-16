import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { createTool } from "../helpers.js";

export const getEdiProfiles = createTool({
  name: "get_edi_profiles",
  description: "Retrieve all EDI (Electronic Data Interchange) configurations.",
  inputSchema: {},
  handler: async (_params, context) => {
    const response = await api.get(
      '/ediProfiles',
      context.accessToken,
      context.region
    );
    return filterCeligoResponse(response.data);
  }
});
