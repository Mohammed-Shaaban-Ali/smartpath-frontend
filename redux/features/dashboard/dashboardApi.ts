import { baseApi, SuccessResponse } from "@/redux/app/baseApi";
import { IDashboard } from "@/types/dashboard";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getHomeDashboardStats: build.query<SuccessResponse<IDashboard>, void>({
      query: () => `/dashboard`,
    }),
  }),
});

export const { useGetHomeDashboardStatsQuery } = dashboardApi;
