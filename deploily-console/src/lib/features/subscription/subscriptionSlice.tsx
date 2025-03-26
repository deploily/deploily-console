import { createSlice } from "@reduxjs/toolkit";
import { postSubscription } from "./subscriptionThunks";
import { SubscriptionResponse } from "./subscriptionInterface";

interface SubscriptionState {
  myServiceLoadingError?: any;
  myServiceLoading: boolean;
  currentMyServiceLoadingError?: any;
  currentMyServiceLoading: boolean;
  cartLine_id?: number;
  generateTokenLoading?: boolean;
  generatedToken?: string;
  generateTokenFailed?: boolean;
  isSubscriptionCreatedSuccess: boolean;
  isSubscriptionCreatedFailed: boolean;
  subscriptionResponse?: SubscriptionResponse;

}

const initialState: SubscriptionState = {
  myServiceLoadingError: undefined,
  myServiceLoading: false,
  currentMyServiceLoadingError: undefined,
  currentMyServiceLoading: false,
  cartLine_id: undefined,
  generateTokenLoading: undefined,
  generatedToken: undefined,
  generateTokenFailed: undefined,
  isSubscriptionCreatedSuccess: false,
  isSubscriptionCreatedFailed: false,
  subscriptionResponse: undefined,
};
const SubscriptionSlice = createSlice({
  name: "myService",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postSubscription.pending, (state) => {
        state.myServiceLoading = true;
        state.isSubscriptionCreatedSuccess = false;
        state.isSubscriptionCreatedFailed = false;

      })
      .addCase(postSubscription.rejected, (state) => {
        state.myServiceLoading = false;
        state.isSubscriptionCreatedFailed = true;
        state.isSubscriptionCreatedSuccess = false;
      })
      .addCase(postSubscription.fulfilled, (state,{ payload }) => {
        state.myServiceLoading = false;
        console.log("sliiiiiiiiiiiiiiiiiiiiissssssssssssseeeeeeeee_____________");
        console.log(payload);
        
        
        state.isSubscriptionCreatedSuccess = true;
        state.subscriptionResponse = payload;
        state.isSubscriptionCreatedFailed = false;
      });
  },
});
export default SubscriptionSlice.reducer;
