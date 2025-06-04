import {
  createApi,
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
  baseUrl: "https://pokeapi.co/api/v2/",
  prepareHeaders: (headers) => {
    const token = "111111111111111111111111111111111";
    headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

const baseQueryWithReauth: typeof baseQuery = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    const error = result.error as FetchBaseQueryError;
    const customizedError = error.data as ErrorGlobal;
    if (customizedError.message)
      toast.error(customizedError.message || " something went wrong");
  } else {
    const customizedData = result.data as SuccessResponse;
  }

  return result;
};
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  endpoints: (build) => ({}),

  tagTypes: ["Pokemon", "Pokedex"],
});
