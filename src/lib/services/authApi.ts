import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthResponse, LoginRequest, MessageResponse, RegisterRequest } from "@/types/auth";
import { logout, setCredentials } from "@/redux/slices/authSlice";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/sign-in",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),
    register: builder.mutation<MessageResponse, RegisterRequest>({
      query: (userData) => ({
        url: "/auth/sign_up",
        method: "POST",
        body: userData,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/sign-out",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch }) {
        try {
          // Clear auth state
          dispatch(logout());
          // Clear ALL cached data including the checkAuth query
          dispatch(authApi.util.resetApiState());
          // Force a refetch of checkAuth
          dispatch(authApi.util.invalidateTags(['Auth']));
        } catch (err) {
          console.error('Logout failed:', err);
        }
      },
    }),
    checkAuth: builder.query<AuthResponse, void>({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ['Auth'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useCheckAuthQuery,
} = authApi;
