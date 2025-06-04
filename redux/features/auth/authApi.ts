import { baseApi, SuccessResponse } from "@/redux/app/baseApi";
import { IAuthState, ILoginDTO } from "@/types/auth";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //  login
    login: build.mutation<SuccessResponse<IAuthState>, ILoginDTO>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
