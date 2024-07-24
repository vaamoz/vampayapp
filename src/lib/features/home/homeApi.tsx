import { api } from "@/lib/adminApi";
import { DashBoardDataType } from "@/types/home";

const homeApi = api.injectEndpoints({
  endpoints: (build) => ({
    getDashBoardData: build.query<DashBoardDataType, void>({
      query: () => "Admin/DashboardData",
    }),
  }),

  overrideExisting: false,
});

export const { useGetDashBoardDataQuery } = homeApi;
