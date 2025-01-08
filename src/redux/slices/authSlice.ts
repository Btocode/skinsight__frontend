import { getStorageItem } from "@/utils/storage";
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  user: {
    email: string;
    display_name: string;
  } | null;
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: !!getStorageItem("token"),
  user: null,
  token: typeof window !== "undefined" ? getStorageItem("token") : null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuth: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.access_token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { clearError, setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
