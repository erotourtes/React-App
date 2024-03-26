import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  TaskT,
  TaskListT,
  CreateTaskListDto,
  CreateTaskDto,
  UpdateTaskDto,
  UpdateTaskListDto,
} from "@shared/dtos";

export const api = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  endpoints: () => ({}),
});

const tasksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllTaskLists: builder.query<TaskListT[], void>({
      query: () => `task-lists`,
    }),
    getTasksForList: builder.query<TaskT[], number>({
      query: (list: number) => `tasks/?listId=${list}`,
    }),
    updateTask: builder.mutation<TaskT, UpdateTaskDto>({
      query: (task) => ({
        url: `tasks/${task.id}`,
        method: "PATCH",
        body: { ...task },
      }),
    }),
    deleteTask: builder.mutation<void, TaskT>({
      query: (task) => ({
        url: `tasks/${task.id}`,
        method: "DELETE",
      }),
      onQueryStarted(task, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          tasksApi.util.updateQueryData(
            "getTasksForList",
            task.list.id,
            (tasks) => tasks.filter((t) => t.id !== task.id)
          )
        );
        queryFulfilled.catch(() => {
          console.log("Error deleting task");
          patchResult.undo();
        });
      },
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

const listsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createNewList: builder.mutation<TaskListT, CreateTaskListDto>({
      query: (list) => ({
        url: `task-lists`,
        method: "POST",
        body: list,
      }),
    }),
    updateNewList: builder.mutation<UpdateTaskListDto, TaskListT>({
      query: (list) => ({
        url: `task-lists/${list.id}`,
        method: "PATCH",
        body: list,
      }),
    }),
    deleteNewList: builder.mutation<void, number>({
      query: (id) => ({
        url: `task-lists/${id}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllTaskListsQuery,
  useGetTasksForListQuery,
  useDeleteTaskMutation,
  useCreateNewTaskMutation,
  useUpdateTaskMutation,
} = tasksApi;

export const {
  useCreateNewListMutation,
  useUpdateNewListMutation,
  useDeleteNewListMutation,
} = listsApi;
