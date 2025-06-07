import { baseApi, SuccessResponse } from "@/redux/app/baseApi";
import { IPagenation } from "@/types";
import { IUser } from "@/types/users";

const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //  get all users
    getAllUsers: build.query<
      SuccessResponse<IPagenation<IUser[]>>,
      { page: number }
    >({
      query: ({ page }) => `/user/dashboard/users?page=${page}`,
    }),
  }),
});

export const { useGetAllUsersQuery } = usersApi;
