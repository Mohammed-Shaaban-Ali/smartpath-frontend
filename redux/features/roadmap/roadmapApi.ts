import { baseApi, SuccessResponse } from "@/redux/app/baseApi";
import { IPagenation } from "@/types";
import { IRoadmap } from "@/types/roadmap";

const roadmapApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //  get all roadmap
    getAllroadmap: build.query<
      SuccessResponse<IPagenation<IRoadmap[]>>,
      { page: number }
    >({
      query: ({ page }) => `/roadmap/dashboard?page=${page}`,
      providesTags: ["roadmap"],
    }),

    // add roadmap
    addroadmap: build.mutation<SuccessResponse<any>, FormData>({
      query: (section) => ({
        url: "/roadmap",
        method: "POST",
        body: section,
      }),
      invalidatesTags: ["roadmap"],
    }),

    // update roadmap
    updateroadmap: build.mutation<
      SuccessResponse<any>,
      { id: string; roadmap: FormData }
    >({
      query: ({ id, roadmap }) => ({
        url: `/roadmap/${id}`,
        method: "PUT",
        body: roadmap,
      }),
      invalidatesTags: ["roadmap"],
    }),

    // get single roadmap
    getSingleroadmap: build.query<
      SuccessResponse<{ section: IRoadmap }>,
      string
    >({
      query: (id) => `/roadmap/dashboard/${id}`,
      providesTags: ["roadmap"],
    }),

    // delete roadmap
    deleteroadmap: build.mutation<SuccessResponse<any>, string>({
      query: (id) => ({
        url: `/roadmap/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["roadmap"],
    }),
  }),
});

export const {
  useGetAllroadmapQuery,
  useAddroadmapMutation,
  useGetSingleroadmapQuery,
  useUpdateroadmapMutation,
  useDeleteroadmapMutation,
} = roadmapApi;
