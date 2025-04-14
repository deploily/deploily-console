import { createSlice } from "@reduxjs/toolkit";
import { NewSubscriptionResponse, SubscriptionInterface, SubscriptionsResponse } from "./subscriptionInterface";
import { fetchSubscription, fetchSubscriptionById, generateTokenThunk, postSubscription } from "./subscriptionThunks";

interface SubscriptionState {
  subscriptionResponse?: SubscriptionsResponse;
  subscriptionLoadingError?: any;
  subscriptionLoading: boolean;
  currentSubscription?: SubscriptionInterface;
  currentSubscriptionLoadingError?: any;
  currentSubscriptionLoading: boolean;
  generateTokenLoading?: boolean;
  generatedToken?: string;
  generateTokenFailed?: boolean;
  generateTokenSuccess?: boolean;
  isSubscriptionCreatedSuccess: boolean;
  isSubscriptionCreatedFailed: boolean;
  newSubscriptionResponse?: NewSubscriptionResponse;
}

const initialState: SubscriptionState = {
  subscriptionResponse: undefined,
  subscriptionLoadingError: undefined,
  subscriptionLoading: false,
  currentSubscription: undefined,
  currentSubscriptionLoadingError: undefined,
  currentSubscriptionLoading: false,
  generateTokenLoading: undefined,
  generatedToken: undefined,
  generateTokenFailed: undefined,
  generateTokenSuccess: undefined,
  isSubscriptionCreatedSuccess: false,
  isSubscriptionCreatedFailed: false,
  newSubscriptionResponse: undefined,
};
const SubscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscription.pending, (state) => {
        state.subscriptionLoading = true;
      })
      .addCase(fetchSubscription.fulfilled, (state, action) => {
        state.subscriptionLoading = false;
        state.subscriptionLoadingError = null;
        const result = action.payload.ids.map((id: number, index: any) =>
          Object.assign({}, { id: id }, action.payload.result[index]),
        );
        const payload = Object.assign({}, action.payload, { result: result });
        state.subscriptionResponse = payload;
      })
      .addCase(fetchSubscription.rejected, (state, { payload }) => {
        state.subscriptionLoading = false;
        state.subscriptionLoadingError = payload;
      })
      .addCase(fetchSubscriptionById.pending, (state) => {
        state.newSubscriptionResponse = undefined;
        state.currentSubscriptionLoading = true;
        state.currentSubscriptionLoadingError = null;
        state.generateTokenSuccess = undefined;
      })
      .addCase(fetchSubscriptionById.fulfilled, (state, action) => {
        state.currentSubscriptionLoading = false;
        state.currentSubscriptionLoadingError = null;
        state.currentSubscription = { ...action.payload.result, ...{ id: action.payload.id } };
      })
      .addCase(fetchSubscriptionById.rejected, (state, { payload }) => {
        state.currentSubscriptionLoading = false;
        state.currentSubscriptionLoadingError = payload;
      })
      //GENRATE API TOKEN 
      .addCase(generateTokenThunk.pending, (state) => {
        state.generateTokenLoading = true;
        state.generateTokenSuccess = undefined;
        state.generatedToken = undefined;
      })
      .addCase(generateTokenThunk.fulfilled, (state, action) => {
        state.generateTokenLoading = false;
        state.generateTokenSuccess = true;
        state.generatedToken = action.payload;
      })
      .addCase(generateTokenThunk.rejected, (state) => {
        state.generateTokenLoading = false;
        state.generateTokenFailed = true;
        state.generateTokenSuccess = false;
      })
      .addCase(postSubscription.pending, (state) => {
        state.subscriptionLoading = true;
        state.isSubscriptionCreatedSuccess = false;
        state.isSubscriptionCreatedFailed = false;

      })
      .addCase(postSubscription.rejected, (state) => {
        state.subscriptionLoading = false;
        state.isSubscriptionCreatedFailed = true;
        state.isSubscriptionCreatedSuccess = false;
      })
      .addCase(postSubscription.fulfilled, (state, { payload }) => {
        state.subscriptionLoading = false;
        state.isSubscriptionCreatedSuccess = true;
        state.newSubscriptionResponse = payload;
        state.isSubscriptionCreatedFailed = false;
      });
  },
});
export default SubscriptionSlice.reducer;
