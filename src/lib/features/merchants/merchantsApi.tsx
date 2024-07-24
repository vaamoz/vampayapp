// lib/adminApi.ts

import { api } from "@/lib/adminApi";
import { DashBoardDataType } from "@/types/home";
import {
  AddMerchantRequest,
  AddMerchantResponse,
  BusinessTypeResponse,
  getBusinessCategoryResponse,
  getStateResponse,
} from "@/types/merchants";

const merchantsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getDashBoardData: build.query<DashBoardDataType, void>({
      query: () => "Admin/DashboardData",
    }),
    addMerchant: build.mutation<AddMerchantResponse, AddMerchantRequest>({
      query: (data) => ({
        url: "Admin/AddMerchant",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "https://vaamoz.com",
          Token:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJrZXkiOiIzNDEwZWQ3NTAxNWYxNmRiNWMzM2JhZDMzNjUxMTk0ZmQwNWZmZTRlNjhkMzZkZjI1ZDc3ZGU2NDE4MzM5NDNlIiwidG9rZW4iOiI2ZmRmZDk4YmE3MWQ3MjI3M2ZhZDA5ZDk2N2JlNDdjYmM3YzRkYTgyNzdiY2YwZjJkMzgyOWY4YzNjMzJjMmUxIiwibmFtZSI6bnVsbCwibW9iaWxlIjpudWxsLCJ1c2VydHlwZSI6Ik1lcmNoYW50IiwibWVzc2FnZSI6IkF1dGhvcmlzZWQgQWNjZXNzIn0.OOu6Vn3trp3t_f1cranquT0oaNe6Nyv1aFTwxRaV2Yg",
        },
        body: data,
      }),
    }),
    getState: build.query<getStateResponse, void>({
      query: () => "Admin/GetState",
    }),
    getBusinessType: build.query<BusinessTypeResponse, void>({
      query: () => "Admin/GetBusinessType",
    }),
    getBusinessCategory: build.query<getBusinessCategoryResponse, void>({
      query: () => "Admin/GetBusinessCategory",
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetDashBoardDataQuery,
  useAddMerchantMutation,
  useGetStateQuery,
  useGetBusinessTypeQuery,
  useGetBusinessCategoryQuery,
} = merchantsApi;
