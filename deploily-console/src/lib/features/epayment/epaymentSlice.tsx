import { createSlice } from "@reduxjs/toolkit";
import { EpaymentStatusResult } from "./epaymentInterface";
import {  checkEpaymentStatus } from "./epaymentThunks";

interface PaymentState {
  isLoading: boolean;
  isError?: any;
  
  paymentStatus?: EpaymentStatusResult;
}

const initialState: PaymentState = {
  isLoading: false,
  isError: false,
  paymentStatus: undefined,
};
const EpaymentSlice = createSlice({
  name: "epayment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      

      .addCase(checkEpaymentStatus.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(checkEpaymentStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.paymentStatus = action.payload ;

      })
      .addCase(checkEpaymentStatus.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = payload;
      })
  },
});
export default EpaymentSlice.reducer;
