import { createApi } from "@reduxjs/toolkit/query/react";
import {
  AuthResponse,
  LoginRequest,
  MessageResponse,
  RegisterRequest,
} from "@/types/auth";
import { logout } from "@/redux/slices/authSlice";
import api from './api';

interface BaseQueryArgs {
  url: string;
  method: string;
  body?: unknown;
}

// Custom baseQuery using our API client
const baseQuery = async (args: BaseQueryArgs) => {
  try {
    const result = await api({
      url: args.url,
      method: args.method,
      data: args.body,
    });
    return { data: result.data };
  } catch (error: unknown) {
    const err = error as { response?: { status: number; data: unknown } };
    return {
      error: {
        status: err.response?.status,
        data: err.response?.data,
      },
    };
  }
};

// Add this interface for the forgot password request
interface ForgotPasswordRequest {
  email: string;
}

interface UpdatePasswordRequest {
  new_password: string;
}

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
    forgotPassword: builder.mutation<MessageResponse, ForgotPasswordRequest>({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    updatePassword: builder.mutation<MessageResponse, UpdatePasswordRequest>({
      query: (data) => ({
        url: "/auth/update-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useCheckAuthQuery,
  useForgotPasswordMutation,
  useUpdatePasswordMutation,
} = authApi;
