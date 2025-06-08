import { baseApi, SuccessResponse } from "@/redux/app/baseApi";
import { IPagenation } from "@/types";
import { ITrack } from "@/types/track";

const sectionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //  get all track
    getAllTrack: build.query<
      SuccessResponse<IPagenation<ITrack[]>>,
      { page: number }
    >({
      query: ({ page }) => `/track/dashboard?page=${page}`,
      providesTags: ["track"],
    }),

    // add track
    addTrack: build.mutation<SuccessResponse<any>, FormData>({
      query: (section) => ({
        url: "/track",
        method: "POST",
        body: section,
      }),
      invalidatesTags: ["track"],
    }),

    // update track
    updateTrack: build.mutation<
      SuccessResponse<any>,
      { id: string; track: FormData }
    >({
      query: ({ id, track }) => ({
        url: `/track/${id}`,
        method: "PUT",
        body: track,
      }),
      invalidatesTags: ["track"],
    }),

    // get single track
    getSingleTrack: build.query<SuccessResponse<ITrack>, string>({
      query: (id) => `/track/dashboard/${id}`,
      providesTags: ["track"],
    }),

    // delete track
    deleteTrack: build.mutation<SuccessResponse<any>, string>({
      query: (id) => ({
        url: `/track/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["track"],
    }),
  }),
});

export const {
  useGetAllTrackQuery,
  useAddTrackMutation,
  useGetSingleTrackQuery,
  useUpdateTrackMutation,
  useDeleteTrackMutation,
} = sectionApi;
