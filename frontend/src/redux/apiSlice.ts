import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  TaskT,
  TaskListT,
  CreateTaskListDto,
  CreateTaskDto,
  UpdateTaskDto,
  UpdateTaskListDto,
  HistoryT,
} from "@shared/dtos";

// TODO: REFACTOR THIS

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
    updateTask: builder.mutation<
      TaskT,
      { oldTask: TaskT; updatedTask: UpdateTaskDto }
    >({
      query: ({ updatedTask }) => ({
        url: `tasks/${updatedTask.id}`,
        method: "PATCH",
        body: { ...updatedTask },
      }),
      onQueryStarted({ oldTask, updatedTask }, { dispatch, queryFulfilled }) {
        // TODO: REFACTOR THIS
        const isTaskListSame =
          !updatedTask.listId || updatedTask.listId === oldTask.list.id;
        if (isTaskListSame) {
          const patchResult = dispatch(
            tasksApi.util.updateQueryData(
              "getTasksForList",
              oldTask.list.id,
              (tasks) =>
                tasks.map((t) =>
                  t.id === updatedTask.id ? { ...t, ...updatedTask } : t
                )
            )
          );
          queryFulfilled.catch(() => {
            console.log("Error updating task");
            patchResult.undo();
          });
        } else {
          const patcheRemove = dispatch(
            tasksApi.util.updateQueryData(
              "getTasksForList",
              oldTask.list.id,
              (tasks) => {
                return tasks.filter((t) => t.id !== updatedTask.id);
              }
            )
          );
          const newTask: TaskT = {
            ...oldTask,
            list: { id: updatedTask.listId! },
          };
          const patchAdd = dispatch(
            tasksApi.util.updateQueryData(
              "getTasksForList",
              updatedTask.listId!,
              (tasks) => [...tasks, newTask]
            )
          );
          queryFulfilled.catch(() => {
            console.log("Error updating task");
            patcheRemove.undo();
            patchAdd.undo();
          });
        }
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

export const {
  useGetTasksForListQuery,
  useCreateNewTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;

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
  useGetAllTaskListsQuery,
  useCreateNewListMutation,
  useUpdateNewListMutation,
  useDeleteNewListMutation,
} = listsApi;

const historyApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllHistory: builder.query<HistoryT[], void>({
      query: () => `history`,
    }),
    getHistoryForTask: builder.query<HistoryT[], number>({
      query: (taskId) => `history/tasks/${taskId}`,
    }),
  }),
});

export const { useGetHistoryForTaskQuery, useGetAllHistoryQuery } = historyApi;
