import {createSlice} from "@reduxjs/toolkit";
import {PromoCodeInterface} from "./promoCodeInterface";
import {checkPromoCode} from "./promoCodeThunks";

interface PormoCodeState {
  promoCodeResponse?: PromoCodeInterface;
  promoCodeLoadingError: boolean;
  promoCodeLoading: boolean;
}

const initialState: PormoCodeState = {
  promoCodeResponse: undefined,
  promoCodeLoadingError: false,
  promoCodeLoading: false,
};
const PormoCodeSlice = createSlice({
  name: "pormoCode",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkPromoCode.pending, (state) => {
        state.promoCodeLoading = true;
        state.promoCodeLoadingError = false;
        state.promoCodeResponse = undefined;
      })
      .addCase(checkPromoCode.fulfilled, (state, action) => {
        state.promoCodeLoading = false;
        state.promoCodeLoadingError = false;
        state.promoCodeResponse = action.payload;
      })
      .addCase(checkPromoCode.rejected, (state) => {
        state.promoCodeLoading = false;
        state.promoCodeLoadingError = true;
      });
  },
});
export default PormoCodeSlice.reducer;
