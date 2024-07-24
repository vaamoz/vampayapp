"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RootState } from "./store";
import { useSelector } from "react-redux";

// const getTokenFromState: any = (state: RootState) => state.auth.isToken;

const baseUrl = "https://vaamoz.com/vampayUserAppNew/";

console.log(baseUrl, "baseUrlbaseUrl");

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    // const token = getTokenFromState(getState() as RootState);
    headers.set("Content-Type", "application/json");
    headers.set("Origin", "https://vaamoz.com");
    // if (token) {
    //   headers.set("Token", token);
    // }
    headers.set(
      "Token",
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJrZXkiOiIzNDEwZWQ3NTAxNWYxNmRiNWMzM2JhZDMzNjUxMTk0ZmQwNWZmZTRlNjhkMzZkZjI1ZDc3ZGU2NDE4MzM5NDNlIiwidG9rZW4iOiI2ZmRmZDk4YmE3MWQ3MjI3M2ZhZDA5ZDk2N2JlNDdjYmM3YzRkYTgyNzdiY2YwZjJkMzgyOWY4YzNjMzJjMmUxIiwibmFtZSI6bnVsbCwibW9iaWxlIjpudWxsLCJ1c2VydHlwZSI6Ik1lcmNoYW50IiwibWVzc2FnZSI6IkF1dGhvcmlzZWQgQWNjZXNzIn0.OOu6Vn3trp3t_f1cranquT0oaNe6Nyv1aFTwxRaV2Yg"
    );

    return headers;
  },
});

export const api = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: () => ({}),
});
