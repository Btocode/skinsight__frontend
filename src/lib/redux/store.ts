import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../redux/slices/authSlice";
import { baseApi } from "./baseApi";
import { authApi } from "../services/authApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    regimen: regimenReducer,
    product: productReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseApi.middleware, authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
