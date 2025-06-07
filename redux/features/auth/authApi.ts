import { baseApi, SuccessResponse } from "@/redux/app/baseApi";
import { IAuthState, ILoginDTO } from "@/types/auth";
import { login } from "./authSlice";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //  login
    login: build.mutation<SuccessResponse<IAuthState>, ILoginDTO>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(login(data.data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
