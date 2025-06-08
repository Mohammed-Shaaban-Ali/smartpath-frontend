import { baseApi, SuccessResponse } from "@/redux/app/baseApi";
import { IPagenation } from "@/types";
import { IFramwork } from "@/types/framwork";

const framworkApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //  get all framwork
    getAllframwork: build.query<
      SuccessResponse<IPagenation<IFramwork[]>>,
      { page: number }
    >({
      query: ({ page }) => `/framwork/dashboard?page=${page}`,
      providesTags: ["framwork"],
    }),

    // add framwork
    addframwork: build.mutation<SuccessResponse<any>, FormData>({
      query: (section) => ({
        url: "/framwork",
        method: "POST",
        body: section,
      }),
      invalidatesTags: ["framwork"],
    }),

    // update framwork
    updateframwork: build.mutation<
      SuccessResponse<any>,
      { id: string; framwork: FormData }
    >({
      query: ({ id, framwork }) => ({
        url: `/framwork/${id}`,
        method: "PUT",
        body: framwork,
      }),
      invalidatesTags: ["framwork"],
    }),

    // get single framwork
    getSingleframwork: build.query<SuccessResponse<IFramwork>, string>({
      query: (id) => `/framwork/dashboard/${id}`,
      providesTags: ["framwork"],
    }),

    // delete framwork
    deleteframwork: build.mutation<SuccessResponse<any>, string>({
      query: (id) => ({
        url: `/framwork/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["framwork"],
    }),
  }),
});

export const {
  useGetAllframworkQuery,
  useAddframworkMutation,
  useGetSingleframworkQuery,
  useUpdateframworkMutation,
  useDeleteframworkMutation,
} = framworkApi;
