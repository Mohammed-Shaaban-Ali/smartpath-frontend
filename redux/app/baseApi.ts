import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";

type ErrorGlobal = {
  message: string;
  statusCode: number;
  data: any;
};
export interface SuccessResponse<DataType = any> {
  message: string;
  statusCode: number;
  data: DataType;
}
const baseQuery = fetchBaseQuery({
  baseUrl: "http://164.128.130.9:2530/api/v1",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as any).auth.token;
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

const baseQueryWithReauth: typeof baseQuery = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);
  const method = (args as FetchArgs).method || "GET";

  if (result.error) {
    const error = result.error as FetchBaseQueryError;
    const customizedError = error.data as ErrorGlobal;
    if (customizedError.message)
      toast.error(customizedError.message || " something went wrong");
  } else {
    const customizedData = result.data as SuccessResponse;
    if (method != "GET") toast.success(customizedData.message);
  }
  return result;
};
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({}),
  tagTypes: ["section"],
});
