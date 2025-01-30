/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of user data we want to store
interface User {
  id: string;
  email: string;
  display_name: string;
  avatar_url?: string;
  provider?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: any }>) => {
      const userData = action.payload.user;

      if (!userData) {
        state.user = null;
        state.isAuthenticated = false;
        return;
      }

      state.user = {
        id: userData.id || userData.sub, // Handle both ID formats
        email: userData.email,
        display_name:
          userData.user_metadata?.full_name ||
          userData.user_metadata?.name ||
          userData.user_metadata?.display_name ||
          userData.email?.split("@")[0], // Fallback to email username
        avatar_url:
          userData.user_metadata?.avatar_url || userData.user_metadata?.picture,
        provider: userData.app_metadata?.provider || "email",
      };
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setCredentials, logout, clearError } = authSlice.actions;
export default authSlice.reducer;

// Selector to get user display name
export const selectUserDisplayName = (state: { auth: AuthState }) =>
  state.auth.user?.display_name;

// Selector to get user avatar
export const selectUserAvatar = (state: { auth: AuthState }) =>
  state.auth.user?.avatar_url;
