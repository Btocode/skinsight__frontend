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
  }),
});
export const { useLoginMutation } = authApi;
