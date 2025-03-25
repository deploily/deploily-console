import { createSlice } from "@reduxjs/toolkit";
import { PaymentInterface, PaymentResponse } from "./paymentInterface";
import { deletePaymentById, deletePayments, fetchPaymentById, fetchPayments } from "./paymentThunks";

interface PaymentState {
  paymentsList?: PaymentResponse;
  isLoading: boolean;
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
  isLoading: false,
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
        state.isLoading = true;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.paymentsLoadingError = null;
        const result = action.payload.ids.map((id: number, index: any) =>
          Object.assign({ key: index }, { id: id }, action.payload.result[index]),
        );

        const payload = Object.assign({}, action.payload, { result: result });
        state.paymentsList = payload;
      })
      .addCase(fetchPayments.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.paymentsLoadingError = payload;
      })
      .addCase(deletePaymentById.pending, (state) => {
        state.deletePaymentByIdLoading = true;
        state.paymentByIdDeleted = false;
        state.deletePaymentByIdError = null;
      })
      .addCase(deletePaymentById.fulfilled, (state) => {
        state.deletePaymentByIdLoading = false;
        state.paymentByIdDeleted = true;
        state.deletePaymentByIdError = null;
      })
      .addCase(deletePaymentById.rejected, (state, { payload }) => {
        state.deletePaymentByIdLoading = false;
        state.paymentByIdDeleted = false;
        state.deletePaymentByIdError = payload;
      })
      .addCase(deletePayments.pending, (state) => {
        state.deletePaymentByIdLoading = true;
        state.paymentByIdDeleted = false;
        state.deletePaymentByIdError = null;
      })
      .addCase(deletePayments.fulfilled, (state) => {
        state.deletePaymentByIdLoading = false;
        state.paymentByIdDeleted = true;
        state.deletePaymentByIdError = null;
      })
      .addCase(deletePayments.rejected, (state, { payload }) => {
        state.deletePaymentByIdLoading = false;
        state.paymentByIdDeleted = false;
        state.deletePaymentByIdError = payload;
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
