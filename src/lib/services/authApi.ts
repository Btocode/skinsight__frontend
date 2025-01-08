import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  getStorageItem,
  setStorageItem,
  removeStorageItem,
} from "@/utils/storage";

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  display_name: string;
  email: string;
  password: string;
}

interface AuthUser {
  email: string;
  display_name: string;
}

interface AuthResponse {
  user: AuthUser;
  access_token: string;
  token_type: string;
}

interface MessageResponse {
  message: string;
}

interface ErrorResponse {
  detail: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
      const token = getStorageItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/sign_in",
        method: "POST",
        body: credentials,
      }),
      onQueryStarted: async (args, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          console.log("Login successful:", data);
          setStorageItem("token", data.access_token);
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),
    register: builder.mutation<MessageResponse, RegisterRequest>({
      query: (userData) => ({
        url: "/auth/sign_up",
        method: "POST",
        body: userData,
      }),
      onQueryStarted: async (args, { queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          if (response.meta?.response?.status === 201) {
            console.log("Registration successful");
          }
        } catch (error) {
          console.error("Registration failed:", error);
        }
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      onQueryStarted: async (args, { queryFulfilled }) => {
        try {
          await queryFulfilled;
          removeStorageItem("token");
        } catch (error) {
          console.error("Logout failed:", error);
        }
      },
    }),
    fetchCurrentUser: builder.query<{ user: any }, void>({
      query: () => "/auth/user",
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useFetchCurrentUserQuery,
} = authApi;
