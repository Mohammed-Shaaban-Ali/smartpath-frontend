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

    // update section
    updateSection: build.mutation<
      SuccessResponse<any>,
      { id: string; section: FormData }
    >({
      query: ({ id, section }) => ({
        url: `/section/${id}`,
        method: "PUT",
        body: section,
      }),
      invalidatesTags: ["section"],
    }),

    // get single section
    getSingleSection: build.query<SuccessResponse<ISection>, string>({
      query: (id) => `/section/${id}`,
      providesTags: ["section"],
    }),

    // delete section
    deleteSection: build.mutation<SuccessResponse<any>, string>({
      query: (id) => ({
        url: `/section/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["section"],
    }),
  }),
});

export const {
  useGetAllSectionsQuery,
  useAddSectionMutation,
  useGetSingleSectionQuery,
  useUpdateSectionMutation,
  useDeleteSectionMutation,
} = sectionApi;
