import { createSlice } from "@reduxjs/toolkit";
import { NewFundBalanceResponse, newPaymentProfileResponse, PaymentProfileInterface, PaymentProfilesResponse } from "./paymentProfilesInterface";
import { fetchNotDefaultPaymentProfiles, fetchPaymentProfiles, getPaymentProfileById, postFundBalance, postPaymentProfile } from "./paymentProfilesThunks";

interface PaymentProfileState {
  paymentProfilesList?: PaymentProfilesResponse;
  isLoading: boolean;
  paymentProfilesLoadingError?: any;
  currentProfile?: PaymentProfileInterface;
  currentProfileLoading?: boolean;
  currentProfileError?: any;
  isPaymentProfileCreatedSuccess: boolean;
  isPaymentProfileCreatedFailed: boolean;
  newPaymentProfileResponse?: newPaymentProfileResponse;
  isFundBalanceSuccess: boolean;
  isFundBalanceFailed: boolean;
  newFundBalanceResponse?: NewFundBalanceResponse;

  notDefaultaymentProfiles:{
    paymentProfilesList?: PaymentProfilesResponse;
    isLoading: boolean;
    paymentProfilesLoadingError?: any;
  }

}

const initialState: PaymentProfileState = {
  paymentProfilesList: undefined,
  isLoading: false,
  paymentProfilesLoadingError: undefined,
  currentProfile: undefined,
  currentProfileLoading: false,
  currentProfileError: undefined,
  isPaymentProfileCreatedSuccess: false,
  isPaymentProfileCreatedFailed: false,
  newPaymentProfileResponse: undefined,
  isFundBalanceSuccess: false,
  isFundBalanceFailed: false,
  newFundBalanceResponse: undefined,
  notDefaultaymentProfiles:{
    isLoading: false,
    paymentProfilesLoadingError: false,
    paymentProfilesList: undefined
  }

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
      .addCase(postPaymentProfile.pending, (state) => {
        state.isLoading = true;
        state.isPaymentProfileCreatedSuccess = false;
        state.isPaymentProfileCreatedFailed = false;
      
            })
      .addCase(postPaymentProfile.rejected, (state) => {
        state.isLoading = false;
        state.isPaymentProfileCreatedFailed = true;
        state.isPaymentProfileCreatedSuccess = false;
            })
      .addCase(postPaymentProfile.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isPaymentProfileCreatedSuccess = true;
        state.newPaymentProfileResponse = payload;
        state.isPaymentProfileCreatedFailed = false;
      })
      .addCase(postFundBalance.pending, (state) => {
        state.isLoading = true;
        state.isFundBalanceSuccess = false;
        state.isFundBalanceFailed = false;
      
            })
      .addCase(postFundBalance.rejected, (state) => {
        state.isLoading = false;
        state.isFundBalanceFailed = true;
        state.isFundBalanceSuccess = false;
            })
      .addCase(postFundBalance.fulfilled, (state, { payload }) => {
        console.log("postFundBalance.fulfilled", payload );
        
        state.isLoading = false;

        state.isFundBalanceSuccess = true;
        
        state.newFundBalanceResponse = payload;
        console.log("postFundBalanceeeeeeeeeeeeeeeeeeeeeeeeee" );
        console.log("postFundBalance.fulfilleddddddddddddddd", state.newFundBalanceResponse );

        state.isFundBalanceFailed = false;
            }) 
            
      .addCase(fetchNotDefaultPaymentProfiles.pending, (state) => {
        state.notDefaultaymentProfiles.isLoading = true;
      })
      .addCase(fetchNotDefaultPaymentProfiles.fulfilled, (state, action) => {
        state.notDefaultaymentProfiles.isLoading = false;
        state.notDefaultaymentProfiles.paymentProfilesLoadingError = null;
        const result = action.payload.ids.map((id: number, index: any) =>
          Object.assign({}, { id: id }, action.payload.result[index]),
        );
        const payload = Object.assign({}, action.payload, { result: result });
        state.notDefaultaymentProfiles.paymentProfilesList = payload;
      })
      .addCase(fetchNotDefaultPaymentProfiles.rejected, (state, { payload }) => {
        state.notDefaultaymentProfiles.isLoading = false;
        state.notDefaultaymentProfiles.paymentProfilesLoadingError = payload;
      });

  },
});
export default PaymentProfileSlice.reducer;
