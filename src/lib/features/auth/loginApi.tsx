import { api } from "@/lib/adminApi";
import { loginDataType, loginResponseType } from "@/types/login";

const loginApi = api.injectEndpoints({
  endpoints: (build) => ({
    updateLogin: build.mutation<loginResponseType, loginDataType>({
      query: (userDetail) => ({
        url: "Admin/user_login",
        method: "PUT",
        body: userDetail,
      }),
    }),
    verifyOtp: build.mutation({
      query: (userDetail) => ({
        url: "Admin/user_login",
        method: "POST",
        body: userDetail,
      }),
    }),
    verifyLockScreen: build.mutation({
      query: (userDetail) => ({
        url: "Admin/Verify_memberLockScreen",
        method: "POST",
        body: userDetail,
      }),
    }),
    changePassword: build.mutation({
      query: (data) => ({
        url: "",
        method: "POST",
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useUpdateLoginMutation,
  useVerifyOtpMutation,
  useVerifyLockScreenMutation,
} = loginApi;
