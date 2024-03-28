import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import config from "@/config";

export const api = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({ baseUrl: config.API_URL }),
  endpoints: () => ({}),
  tagTypes: ["History"],
});
