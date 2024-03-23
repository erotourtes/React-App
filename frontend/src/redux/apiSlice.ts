import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { CreateTaskDto } from "@shared/dtos";

type TaskT = CreateTaskDto & { id: number };

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  endpoints: (builder) => ({
    getAllTaskLists: builder.query<TaskT[], void>({
      query: () => `task-lists`,
    }),
    getAllTasks: builder.query<TaskT[], void>({
      query: () => `tasks`,
    }),
  }),
});

export const { useGetAllTaskListsQuery, useGetAllTasksQuery } = tasksApi;
