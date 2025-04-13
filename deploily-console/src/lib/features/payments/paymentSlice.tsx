import { createSlice } from "@reduxjs/toolkit";
import { PaymentInterface, PaymentResponse } from "./paymentInterface";
import { fetchPaymentById, fetchPayments } from "./paymentThunks";

interface PaymentState {
  paymentsList?: PaymentResponse;
  isLoadingPayments: boolean;
  paymentsLoadingError?: any;
  deletePaymentByIdLoading: boolean;
  deletePaymentByIdError: any;
  paymentByIdDeleted?: boolean;
  deletePaymentsLoading: boolean;
  deletePaymentsError: any;
  paymentDeleted?: boolean;
  currentPaymentLoading: boolean;
  currentPaymentLoadingError?: any;
  currentPayment?: PaymentInterface;
}

const initialState: PaymentState = {
  paymentsList: undefined,
  isLoadingPayments: false,
  paymentsLoadingError: undefined,
  deletePaymentByIdLoading: false,
  deletePaymentByIdError: false,
  currentPaymentLoading: false,
  deletePaymentsLoading: false,
  deletePaymentsError: false,
  paymentDeleted: undefined,
  paymentByIdDeleted: undefined,
  currentPaymentLoadingError: undefined,
  currentPayment: undefined,
};
const PaymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayments.pending, (state) => {
        state.isLoadingPayments = true;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.isLoadingPayments = false;
        state.paymentsLoadingError = null;
        const result = action.payload.ids.map((id: number, index: any) =>
          Object.assign({ key: index }, { id: id }, action.payload.result[index]),
        );

        const payload = Object.assign({}, action.payload, { result: result });
        state.paymentsList = payload;
      })
      .addCase(fetchPayments.rejected, (state, { payload }) => {
        state.isLoadingPayments = false;
        state.paymentsLoadingError = payload;
      })
      .addCase(fetchPaymentById.pending, (state) => {
        state.currentPaymentLoading = true;
        state.currentPaymentLoadingError = null;
      })
      .addCase(fetchPaymentById.fulfilled, (state, action) => {
        state.currentPaymentLoading = false;
        state.currentPaymentLoadingError = null;
        state.currentPayment = { ...action.payload.result, ...{ id: action.payload.id } };
      })
      .addCase(fetchPaymentById.rejected, (state, { payload }) => {
        state.currentPaymentLoading = false;
        state.currentPaymentLoadingError = payload;
      })
  },
});
export default PaymentSlice.reducer;
