import { api } from "@/redux/api/apiSlice";
import { HistoryT } from "@shared/dtos";

export const historyApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllHistory: builder.query<HistoryT[], void>({
      query: () => `history/tasks`,
      onCacheEntryAdded: async (
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) => {
        const ws = new WebSocket("ws://localhost:3000");
        try {
          await cacheDataLoaded;

          const listener = (event: MessageEvent) => {
            const data = JSON.parse(event.data) as {
              event: string;
              data: HistoryT;
            };
            if (data.event !== "history:task:new") return;
            updateCachedData((draft) => {
              draft?.push(data.data);
            });
          };

          ws.addEventListener("message", listener);
        } catch (error) {
          console.error("Error in websocket connection", error);
        }

        await cacheEntryRemoved;
        ws.close();
      },
    }),
    getHistoryForTask: builder.query<HistoryT[], number>({
      query: (taskId) => `history/tasks/${taskId}`,
      onCacheEntryAdded: async (
        arg,
        { cacheDataLoaded, cacheEntryRemoved, dispatch }
      ) => {
        const ws = new WebSocket("ws://localhost:3000");
        try {
          await cacheDataLoaded;

          const listener = (event: MessageEvent) => {
            const data = JSON.parse(event.data) as {
              event: string;
              data: HistoryT;
            };
            if (data.event !== "history:task:new") return;
            console.log("New task history", data.data);

            dispatch(
              historyApi.util.updateQueryData(
                "getHistoryForTask",
                +data.data.recordId,
                (tasks) => tasks.concat(data.data)
              )
            );
          };

          ws.addEventListener("message", listener);
        } catch (error) {
          console.error("Error in websocket connection", error);
        }

        await cacheEntryRemoved;
        ws.close();
      },
    }),
  }),
});
