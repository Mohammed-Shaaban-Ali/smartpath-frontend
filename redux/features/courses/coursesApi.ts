import { baseApi, SuccessResponse } from "@/redux/app/baseApi";
import { IPagenation } from "@/types";
import { ICourseDetails, ICourses } from "@/types/courses";

const coursesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //  get all courses
    getAllcourses: build.query<
      SuccessResponse<IPagenation<ICourses[]>>,
      { page: number }
    >({
      query: ({ page }) => `/courses/dashboard?page=${page}`,
      providesTags: ["course"],
    }),

    // add courses
    addcourses: build.mutation<SuccessResponse<any>, FormData>({
      query: (section) => ({
        url: "/courses",
        method: "POST",
        body: section,
      }),
      invalidatesTags: ["course"],
    }),

    // update courses
    updatecourses: build.mutation<
      SuccessResponse<any>,
      { id: string; courses: FormData }
    >({
      query: ({ id, courses }) => ({
        url: `/courses/dashboard/${id}`,
        method: "post",
        body: courses,
      }),
      invalidatesTags: ["course"],
    }),

    // get single courses
    getSinglecourses: build.query<SuccessResponse<ICourseDetails>, string>({
      query: (id) => `/courses/dashboard/${id}`,
      providesTags: ["course"],
    }),

    // delete courses
    deletecourses: build.mutation<SuccessResponse<any>, string>({
      query: (id) => ({
        url: `/courses/dashboard/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["course"],
    }),
  }),
});

export const {
  useGetAllcoursesQuery,
  useAddcoursesMutation,
  useUpdatecoursesMutation,
  useGetSinglecoursesQuery,
  useDeletecoursesMutation,
} = coursesApi;
