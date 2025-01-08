import { getStorageItem } from "@/utils/storage";
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  user: { email: string } | null;
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: !!getStorageItem("token"),
  user: null,
  token: getStorageItem("token"),
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
  },
});

export const { clearAuth } = authSlice.actions;
export default authSlice.reducer;
