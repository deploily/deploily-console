import { createSlice } from "@reduxjs/toolkit";
import { PaymentProfileInterface, PaymentProfilesResponse } from "./paymentProfilesInterface";
import { fetchPaymentProfiles, getPaymentProfileById } from "./paymentProfilesThunks";

interface PaymentProfileState {
  paymentProfilesList?: PaymentProfilesResponse;
  isLoading: boolean;
  paymentProfilesLoadingError?: any;
  currentProfile?: PaymentProfileInterface;
  currentProfileLoading?: boolean;
  currentProfileError?: any;
}

const initialState: PaymentProfileState = {
  paymentProfilesList: undefined,
  isLoading: false,
  paymentProfilesLoadingError: undefined,
  currentProfile: undefined,
  currentProfileLoading: false,
  currentProfileError: undefined,

};
const PaymentProfileSlice = createSlice({
  name: "PaymentProfileSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaymentProfiles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPaymentProfiles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.paymentProfilesLoadingError = null;
        const result = action.payload.ids.map((id: number, index: any) =>
          Object.assign({}, { id: id }, action.payload.result[index]),
        );
        const payload = Object.assign({}, action.payload, { result: result });
        state.paymentProfilesList = payload;
      })
      .addCase(fetchPaymentProfiles.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.paymentProfilesLoadingError = payload;
      })
      .addCase(getPaymentProfileById.pending, (state) => {
        state.currentProfileLoading = true;
        state.currentProfileError = null;
      })
      .addCase(getPaymentProfileById.fulfilled, (state, action) => {
        state.currentProfileLoading = false;
        state.currentProfileError = null;
        state.currentProfile = { ...action.payload.result, ...{ id: action.payload.id } };

      })
      .addCase(getPaymentProfileById.rejected, (state, { payload }) => {
        state.currentProfileLoading = false;
        state.currentProfileError = payload;
      })

  },
});
export default PaymentProfileSlice.reducer;
