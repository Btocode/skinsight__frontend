// src/redux/slices/authSlice.ts
import {
  ProductState,
  ProductStateKeyType,
  ProductStateValueType,
} from "@/types/products";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ProductState = {
  gender: null,
  skinType: null,
  complexion: null,
  skinConcern: [],
  age: null,
  region: null,
  addPreference: {
    brand: "",
    product: "",
  },
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductState: (
      state,
      action: PayloadAction<{
        key: ProductStateKeyType;
        value: ProductStateValueType;
      }>
    ) => {
      const { key, value } = action.payload;
      if (key === "skinConcern") {
        if (state.skinConcern.includes(value as string)) {
          state.skinConcern = state.skinConcern.filter(
            (item) => item !== value
          );
          return;
        }
        state.skinConcern.push(value as string);
        return;
      }
      state[key] = value;
    },
    setAddPreference: (
      state,
      action: PayloadAction<{ key: string; value: string }>
    ) => {
      const { key, value } = action.payload;
      state.addPreference[key] = value;
    },
  },
});

export const { setProductState, setAddPreference } = productSlice.actions;
export const productReducer = productSlice.reducer;
