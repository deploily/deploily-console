import { createSlice } from "@reduxjs/toolkit";
import { EpaymentResult } from "./epaymentInterface";
import { checkEpaymentStatus, generatePdfReceipt, sendPdfReceiptEmail } from "./epaymentThunks";

interface PaymentState {
  isLoading: boolean;
  isError?: any;
  paymentStatus?: EpaymentResult;
  emailSending: boolean;
  emailError: string | null;
}

const initialState: PaymentState = {
  isLoading: false,
  isError: false,
  paymentStatus: undefined,
  emailSending: false,
  emailError: null,
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
        state.paymentStatus = action.payload.details;

      })
      .addCase(checkEpaymentStatus.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = payload;
      })
      .addCase(generatePdfReceipt.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(generatePdfReceipt.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
      })
      .addCase(generatePdfReceipt.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = payload;
      })
      .addCase(sendPdfReceiptEmail.pending, state => {
        state.emailSending = true;
        state.emailError = null;
      })
      .addCase(sendPdfReceiptEmail.fulfilled, state => {
        state.emailSending = false;
      })
      .addCase(sendPdfReceiptEmail.rejected, (state, action) => {
        state.emailSending = false;
        state.emailError = action.payload as string;
      });
  },
});
export default EpaymentSlice.reducer;
