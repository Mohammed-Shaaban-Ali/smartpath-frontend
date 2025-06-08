import { baseApi, SuccessResponse } from "@/redux/app/baseApi";
import { IPagenation } from "@/types";

const dropdownApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSectionsForSelect: build.query<
      SuccessResponse<{ _id: string; title: string }[]>,
      void
    >({
      query: () => `/section/select`,
    }),
    getTracksForSelect: build.query<
      SuccessResponse<{ tracks: { id: string; title: string }[] }>,
      void
    >({
      query: () => `/track/select`,
    }),
    getFramworksForSelect: build.query<
      SuccessResponse<{ id: string; title: string }[]>,
      void
    >({
      query: () => `/framwork/select`,
    }),
  }),
});

export const {
  useGetSectionsForSelectQuery,
  useGetTracksForSelectQuery,
  useGetFramworksForSelectQuery,
} = dropdownApi;
