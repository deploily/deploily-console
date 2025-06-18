import { createSlice } from "@reduxjs/toolkit";
import { SubscriptionsResponse } from "./subscriptionInterface";
import { fetchSubscription } from "./subscriptionThunks";

interface SubscriptionState {
  subscriptionResponse?: SubscriptionsResponse;
  subscriptionLoadingError?: any;
  subscriptionLoading: boolean;
}

const initialState: SubscriptionState = {
  subscriptionResponse: undefined,
  subscriptionLoadingError: undefined,
  subscriptionLoading: false,
 
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


      
  },
});
export default SubscriptionSlice.reducer;
