import { z } from "zod";
import { api, filterCeligoResponse } from "../../api.js";
import { License } from "../../types.js";
import { createTool } from "../helpers.js";

export const listLicenses = createTool({
  name: "list_licenses",
  description: "List all SmartConnector licenses.",
  inputSchema: {},
  handler: async (_params, context) => {
    const response = await api.get<License[]>(
      '/licenses',
      context.accessToken,
      context.region
    );
    return filterCeligoResponse(response.data);
  }
});
