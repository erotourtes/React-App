import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { TaskT, TaskListT, CreateTaskListDto } from "@shared/dtos";

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  endpoints: (builder) => ({
    createNewList: builder.mutation<TaskListT, CreateTaskListDto>({
      query: (list) => ({
        url: `task-lists`,
        method: "POST",
        body: list,
      }),
    }),
    getAllTaskLists: builder.query<TaskListT[], void>({
      query: () => `task-lists`,
    }),
    getTasksForList: builder.query<TaskT[], number>({
      query: (list: number) => `tasks/?listId=${list}`,
    }),
    deleteTask: builder.mutation<void, number>({
      query: (id) => ({
        url: `tasks/${id}`,
        method: "DELETE",
      }),
    }),
    addTask: builder.mutation<TaskT, Partial<TaskT>>({
      query: (task) => ({
        url: `tasks`,
        method: "POST",
        body: task,
      }),
    }),
  }),
});

export const {
  useGetAllTaskListsQuery,
  useGetTasksForListQuery,
  useDeleteTaskMutation,
  useAddTaskMutation,
  useCreateNewListMutation,
} = tasksApi;
