// src/lib/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../redux/slices/authSlice";
import userReducer from "../../redux/slices/userSlice";
import { productReducer } from "@/redux/slices/productSlice";
import { baseApi } from "./baseApi";
import { regimenReducer } from "@/redux/slices/regimenSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    product: productReducer,
    regimen: regimenReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
