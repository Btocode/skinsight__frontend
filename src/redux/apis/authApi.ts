import { baseApi } from "@/lib/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (credentials: { email: string; password: string }) => ({
        url: "/auth/sign_in",
        method: "POST",
        body: credentials,
      }),
    }),
    register: build.mutation({
      query: (credentials: { email: string; password: string }) => ({
        url: "/auth/sign_up",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: build.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
  }),
});
export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  authApi;
