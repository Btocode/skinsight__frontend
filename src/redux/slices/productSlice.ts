// src/redux/slices/authSlice.ts
import {
  Gender,
  ProductState,
  ProductStateKeyType,
  ProductStateValueType,
  Region,
} from "@/types/products";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ProductState = {
  gender: null,
  skinType: null,
  complexion: null,
  skinConcern: [],
  age: null,
  region: null,
  findAlternatives: {
    brand: "",
    product: "",
  },
  preferences: [],
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
      if (key === "findAlternatives") {
        return;
      }
      if (key === "region") {
        state.region = value as Region;
      }
      if (key === "gender") {
        state.gender = value as Gender;
      }
      if (key === "skinType") {
        state.skinType = value as string;
      }
      if (key === "complexion") {
        state.complexion = value as string;
      }
      if (key === "age") {
        state.age = value as string;
      }
    },
    setFindAlternatives: (
      state,
      action: PayloadAction<{
        key: keyof typeof initialState.findAlternatives;
        value: string;
      }>
    ) => {
      const { key, value } = action.payload;
      state.findAlternatives[key] = value;
    },
    setPreference: (state, action) => {
      const preference = action.payload;
      state.preferences.push({
        id: state.preferences.length + 1,
        ...preference,
      });
    },
  },
});

export const { setProductState, setFindAlternatives, setPreference } =
  productSlice.actions;
export const productReducer = productSlice.reducer;
