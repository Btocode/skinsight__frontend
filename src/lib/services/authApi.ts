import { createApi } from "@reduxjs/toolkit/query/react";
import {
  AuthResponse,
  LoginRequest,
  MessageResponse,
  RegisterRequest,
} from "@/types/auth";
import { logout } from "@/redux/slices/authSlice";
import api from './api';

// Custom baseQuery using our API client
const baseQuery = async (args: any) => {
  try {
    const result = await api({
      url: args.url,
      method: args.method,
      data: args.body,
    });
    return { data: result.data };
  } catch (error: any) {
    return {
      error: {
        status: error.response?.status,
        data: error.response?.data,
      },
    };
  }
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/sign-in",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    register: builder.mutation<MessageResponse, RegisterRequest>({
      query: (userData) => ({
        url: "/auth/sign-up",
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
          dispatch(authApi.util.invalidateTags(["Auth"]));
        } catch (err) {
          console.error("Logout failed:", err);
        }
      },
    }),
    checkAuth: builder.query<AuthResponse, void>({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useCheckAuthQuery,
} = authApi;
