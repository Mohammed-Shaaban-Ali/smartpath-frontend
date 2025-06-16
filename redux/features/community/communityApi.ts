import { baseApi, SuccessResponse } from "@/redux/app/baseApi";
import { IPagenation } from "@/types";
import { IGroup, IMessage } from "@/types/community";

const communityApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //  get all group
    getAllGroup: build.query<
      SuccessResponse<IPagenation<IGroup[]>>,
      { page: number }
    >({
      query: ({ page }) => `/group/dashboard?page=${page}`,
      providesTags: ["community"],
    }),

    // get group by id

    getGroupById: build.query<SuccessResponse<{ group: IGroup }>, string>({
      query: (id) => `/group/${id}`,
      providesTags: ["community"],
    }),
    // carete group
    createGroup: build.mutation<SuccessResponse<any>, FormData>({
      query: (section) => ({
        url: "/group",
        method: "POST",
        body: section,
      }),
      invalidatesTags: ["community"],
    }),

    // update group
    updateGroup: build.mutation<
      SuccessResponse<any>,
      { id: string; group: FormData }
    >({
      query: ({ id, group }) => ({
        url: `/group/${id}`,
        method: "PUT",
        body: group,
      }),
      invalidatesTags: ["community"],
    }),
    // delete group
    deleteGroup: build.mutation<SuccessResponse<any>, string>({
      query: (id) => ({
        url: `/group/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["community"],
    }),
    //  get all messages with group id
    getAllMessages: build.query<
      SuccessResponse<IPagenation<IMessage[]>>,
      { page: number; id: string }
    >({
      query: ({ page, id }) => `/message/dashboard/${id}?page=${page}`,
      providesTags: ["community"],
    }),
  }),
});

export const {
  useGetAllGroupQuery,
  useGetGroupByIdQuery,
  useCreateGroupMutation,
  useUpdateGroupMutation,
  useDeleteGroupMutation,
  useGetAllMessagesQuery,
} = communityApi;
