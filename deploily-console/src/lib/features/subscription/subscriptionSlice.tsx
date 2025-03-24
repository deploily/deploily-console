import { createSlice } from "@reduxjs/toolkit";
import { postSubscription } from "./subscriptionThunks";

interface SubscriptionState {
  myServiceLoadingError?: any;
  myServiceLoading: boolean;
  currentMyServiceLoadingError?: any;
  currentMyServiceLoading: boolean;
  cartLine_id?: number;
  generateTokenLoading?: boolean;
  generatedToken?: string;
  generateTokenFailed?: boolean;
  isProductCreatedSuccess: boolean;
  isProductCreatedFailed: boolean;
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
  isProductCreatedSuccess: false,
  isProductCreatedFailed: false,
};
const SubscriptionSlice = createSlice({
  name: "myService",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postSubscription.pending, (state) => {
        state.myServiceLoading = true;
        state.isProductCreatedSuccess = false;
        state.isProductCreatedFailed = false;

      })
      .addCase(postSubscription.rejected, (state) => {
        state.myServiceLoading = false;
        state.isProductCreatedFailed = true;
        state.isProductCreatedSuccess = false;
      })
      .addCase(postSubscription.fulfilled, (state) => {
        state.myServiceLoading = false;
        state.isProductCreatedSuccess = true;
        state.isProductCreatedFailed = false;
      });
  },
});
export default SubscriptionSlice.reducer;
