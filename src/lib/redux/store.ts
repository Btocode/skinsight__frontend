import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../redux/slices/authSlice";
import { baseApi } from "./baseApi";
import { regimenReducer } from "@/redux/slices/regimenSlice";
import { productReducer } from "@/redux/slices/productSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    regimen: regimenReducer,
    product: productReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
