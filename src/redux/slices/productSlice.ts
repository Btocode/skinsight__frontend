"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/redux/slices/authSlice.ts
import { ProductState, UserSkinProfileKey } from "@/types/products";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCookie, hasCookie } from "cookies-next/client";

const isClient = typeof window !== "undefined";

const userSkinProfileState = {
  gender: null,
  skin_type: null,
  skin_complexion: null,
  skin_concern: [],
  age_group: null,
  region: null,
};

const initialRecommendationState = () => {
  if (!isClient)
    return {
      userSkinProfile: userSkinProfileState,
    };

  const recommendation = getCookie("recommendation");
  const hasRecommendation = hasCookie("recommendation");

  return hasRecommendation
    ? {
        userSkinProfile: JSON.parse(recommendation || ""),
      }
    : {
        userSkinProfile: userSkinProfileState,
      };
};

const initialState: ProductState = {
  ...initialRecommendationState(),
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
    updateUserSkinProfile: (
      state,
      action: PayloadAction<{
        key: UserSkinProfileKey;
        value: any;
      }>
    ) => {
      const { key, value } = action.payload;

      if (key === "skin_concern") {
        if (state.userSkinProfile.skin_concern.includes(value as string)) {
          state.userSkinProfile.skin_concern =
            state.userSkinProfile.skin_concern.filter(
              (item: string) => item !== value
            );
          return;
        }
        state.userSkinProfile.skin_concern.push(value as string);
        return;
      }
      state.userSkinProfile[key] = value;
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

export const { setFindAlternatives, setPreference, updateUserSkinProfile } =
  productSlice.actions;
export const productReducer = productSlice.reducer;
