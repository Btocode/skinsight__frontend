import { RegimenState, SelectedRegimen } from "@/types/regimen";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: RegimenState = {
  productCount: "",
  personalRegimen: {},
};

const regimenSlice = createSlice({
  name: "regimen",
  initialState,
  reducers: {
    setRegimenState(
      state,
      action: PayloadAction<Pick<RegimenState, "productCount">>
    ) {
      state.productCount = action.payload.productCount;
    },
    updatePersonalRegimen(
      state,
      action: PayloadAction<{
        type: string;
        regimen: SelectedRegimen;
      }>
    ) {
      const { type, regimen } = action.payload;
      state.personalRegimen[type] = regimen;
    },
    onClearPersonalRegimen(state, action: PayloadAction<string>) {
      const type = action.payload;
      // check if type exists
      if (!state.personalRegimen[type]) return;
      delete state.personalRegimen[type];
    },
  },
});

export const {
  setRegimenState,
  updatePersonalRegimen,
  onClearPersonalRegimen,
} = regimenSlice.actions;
export const regimenReducer = regimenSlice.reducer;
