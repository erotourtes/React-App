import { api } from "@/redux/api/apiSlice";
import { HistoryT } from "@shared/dtos";

export const historyApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllHistory: builder.query<HistoryT[], void>({
      query: () => `history/tasks`,
      providesTags: ["History"],
    }),
    getHistoryForTask: builder.query<HistoryT[], number>({
      query: (taskId) => `history/tasks/${taskId}`,
      providesTags: ["History"],
    }),
  }),
});
