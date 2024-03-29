import { api } from "@/redux/api/apiSlice";
import { WebSocketService } from "@/redux/api/wsService";
import { HistoryT } from "@shared/dtos";

const wsService = WebSocketService.getInstace();

export const historyApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllHistory: builder.query<HistoryT[], void>({
      query: () => `history/tasks`,
      onCacheEntryAdded: async (arg, { updateCachedData }) => {
        wsService.on<HistoryT>("history:task:new", (data) => {
          updateCachedData((draft) => {
            draft?.push(data);
          });
        });
      },
    }),
    getHistoryForTask: builder.query<HistoryT[], number>({
      query: (taskId) => `history/tasks/${taskId}`,
      onCacheEntryAdded: async (arg, { dispatch }) => {
        wsService.on<HistoryT>("history:task:new", (data) => {
          dispatch(
            historyApi.util.updateQueryData(
              "getHistoryForTask",
              +data.recordId,
              (tasks) => tasks.concat(data)
            )
          );
        });
      },
    }),
  }),
});
