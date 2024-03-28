import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import config from "@/config";
import {
  isRejectedWithValue,
  Middleware,
  MiddlewareAPI,
} from "@reduxjs/toolkit";
import { toast } from "sonner";

export const api = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({ baseUrl: config.API_URL }),
  endpoints: () => ({}),
  tagTypes: ["History"],
});

type ErrorResponseT = {
  message: string;
  statusCode: number;
};

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const {
      data: { message, statusCode },
    } = action.payload as { data: ErrorResponseT };

    toast.error("Error: " + action.error.message, {
      duration: 5000,
      description: `${message} <${statusCode}>`,
      dismissible: true,
      closeButton: true,
    });
  }

  return next(action);
};