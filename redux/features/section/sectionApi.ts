import { baseApi, SuccessResponse } from "@/redux/app/baseApi";
import { IPagenation } from "@/types";
import { ISection } from "@/types/sections";

const sectionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //  get all sections
    getAllSections: build.query<
      SuccessResponse<IPagenation<ISection[]>>,
      { page: number }
    >({
      query: ({ page }) => `/section/dashboard?page=${page}`,
      providesTags: ["section"],
    }),

    // add section
    addSection: build.mutation<SuccessResponse<any>, FormData>({
      query: (section) => ({
        url: "/section",
        method: "POST",
        body: section,
      }),
      invalidatesTags: ["section"],
    }),
  }),
});

export const { useGetAllSectionsQuery, useAddSectionMutation } = sectionApi;
