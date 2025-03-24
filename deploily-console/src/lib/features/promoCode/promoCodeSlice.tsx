import { createSlice } from "@reduxjs/toolkit";
import { PromoCodeInterface } from "./promoCodeInterface";
import { checkPromoCode } from "./promoCodeThunks";

interface PormoCodeState {
  promoCodeResponse?: PromoCodeInterface;
  promoCodeLoadingError?: any;
  promoCodeLoading: boolean;
}

const initialState: PormoCodeState = {
  promoCodeResponse: undefined,
  promoCodeLoadingError: undefined,
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
      })
      .addCase(checkPromoCode.fulfilled, (state, action) => {
        
        state.promoCodeLoading = false;
        state.promoCodeLoadingError = null;
        state.promoCodeResponse = action.payload;


      })
      .addCase(checkPromoCode.rejected, (state, { payload }) => {
        state.promoCodeLoading = false;
        state.promoCodeLoadingError = payload;
      })
  },
});
export default PormoCodeSlice.reducer;
