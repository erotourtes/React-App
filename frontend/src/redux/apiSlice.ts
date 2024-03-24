import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  TaskT,
  TaskListT,
  CreateTaskListDto,
  CreateTaskDto,
} from "@shared/dtos";

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
    updateTask: builder.mutation<TaskT, TaskT>({
      query: (task) => ({
        url: `tasks/${task.id}`,
        method: "PATCH",
        body: { ...task },
      }),
    }),
    deleteTask: builder.mutation<void, number>({
      query: (id) => ({
        url: `tasks/${id}`,
        method: "DELETE",
      }),
    }),
    createNewTask: builder.mutation<TaskT, CreateTaskDto>({
      query: (task) => ({
        url: `tasks`,
        method: "POST",
        body: { ...task }, // Wut, need to destructure?
      }),
    }),
  }),
});

export const {
  useGetAllTaskListsQuery,
  useGetTasksForListQuery,
  useDeleteTaskMutation,
  useCreateNewTaskMutation,
  useCreateNewListMutation,
  useUpdateTaskMutation,
} = tasksApi;
