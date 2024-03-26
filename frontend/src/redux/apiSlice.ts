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
    getTasksForList: builder.query<TaskT[], number>({
      query: (list: number) => `tasks/?listId=${list}`,
    }),
    updateTask: builder.mutation<TaskT, UpdateTaskDto & { listId: number }>({
      query: (task) => ({
        url: `tasks/${task.id}`,
        method: "PATCH",
        body: { ...task },
      }),
      onQueryStarted(task, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          tasksApi.util.updateQueryData(
            "getTasksForList",
            task.listId,
            (tasks) =>
              tasks.map((t) => (t.id === task.id ? { ...t, ...task } : t))
          )
        );
        queryFulfilled.catch(() => {
          console.log("Error updating task");
          patchResult.undo();
        });
      },
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
    createNewTask: builder.mutation<TaskT, CreateTaskDto & { listId: number }>({
      query: (task) => ({
        url: `tasks`,
        method: "POST",
        body: { ...task }, // Wut, need to { ...destructure?
      }),
      onQueryStarted(task, { dispatch, queryFulfilled }) {
        const randId = -Math.floor(Math.random() * 1000);
        const newTask: TaskT = {
          id: randId,
          ...task,
          list: {
            id: task.listId,
          },
        };
        const patchResult = dispatch(
          tasksApi.util.updateQueryData(
            "getTasksForList",
            task.listId,
            (tasks) => [...tasks, newTask]
          )
        );

        queryFulfilled
          .then(({ data: task }) => {
            dispatch(
              tasksApi.util.updateQueryData(
                "getTasksForList",
                task.list.id,
                (tasks) => tasks.map((t) => (t.id === randId ? task : t))
              )
            );
          })
          .catch(() => {
            console.log("Error creating task");
            patchResult.undo();
          });
      },
    }),
  }),
});

const listsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllTaskLists: builder.query<TaskListT[], void>({
      query: () => `task-lists`,
    }),
    createNewList: builder.mutation<TaskListT, CreateTaskListDto>({
      query: (list) => ({
        url: `task-lists`,
        method: "POST",
        body: list,
      }),
      onQueryStarted(list, { dispatch, queryFulfilled }) {
        const randId = -Math.floor(Math.random() * 1000);
        const patchResult = dispatch(
          listsApi.util.updateQueryData(
            "getAllTaskLists",
            undefined,
            (lists) => [...lists, { ...list, id: randId }]
          )
        );
        queryFulfilled
          .then(({ data: list }) => {
            dispatch(
              listsApi.util.updateQueryData(
                "getAllTaskLists",
                undefined,
                (lists) => lists.map((l) => (l.id === randId ? list : l))
              )
            );
          })
          .catch(() => {
            console.log("Error creating list");
            patchResult.undo();
          });
      },
    }),
    updateNewList: builder.mutation<UpdateTaskListDto, TaskListT>({
      query: (list) => ({
        url: `task-lists/${list.id}`,
        method: "PATCH",
        body: list,
      }),
      onQueryStarted(list, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          listsApi.util.updateQueryData("getAllTaskLists", undefined, (lists) =>
            lists.map((l) => (l.id === list.id ? { ...l, ...list } : l))
          )
        );
        queryFulfilled.catch(() => {
          console.log("Error updating list");
          patchResult.undo();
        });
      },
    }),
    deleteNewList: builder.mutation<void, number>({
      query: (id) => ({
        url: `task-lists/${id}`,
        method: "DELETE",
      }),
      onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          listsApi.util.updateQueryData("getAllTaskLists", undefined, (lists) =>
            lists.filter((l) => l.id !== id)
          )
        );
        queryFulfilled.catch(() => {
          console.log("Error deleting list");
          patchResult.undo();
        });
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTasksForListQuery,
  useCreateNewTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;

export const {
  useGetAllTaskListsQuery,
  useCreateNewListMutation,
  useUpdateNewListMutation,
  useDeleteNewListMutation,
} = listsApi;
