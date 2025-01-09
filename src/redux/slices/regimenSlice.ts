// src/redux/slices/authSlice.ts
import { RegimenState } from "@/types/regimen";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: RegimenState = {
  productCount: "",
};

const regimenSlice = createSlice({
  name: "regimen",
  initialState,
  reducers: {
    setRegimenState(state, action: PayloadAction<RegimenState>) {
      state.productCount = action.payload.productCount;
    },
  },
});

export const { setRegimenState } = regimenSlice.actions;
export const regimenReducer = regimenSlice.reducer;
