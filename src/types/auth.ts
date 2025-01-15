import { loginSchema } from "@/schema/auth";
import { authActions } from "@/utils/auth";
import { z } from "zod";

export type AuthActionType = (typeof authActions)[number];

export type LoginSchema = z.infer<typeof loginSchema>;

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  display_name: string;
  email: string;
  password: string;
}

export interface AuthUser {
  email: string;
  display_name: string;
}

export interface AuthResponse {
  user: {
    email: string;
    display_name: string;
  };
  token_type: string;
}

export interface MessageResponse {
  message: string;
}

export interface ErrorResponse {
  detail: string;
}

export interface RefreshTokenRequest {
  refresh_token: string;
}