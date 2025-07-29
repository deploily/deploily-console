import { createSlice } from "@reduxjs/toolkit";
import { SubscriptionsHistoryState, SubscriptionsState } from "./subscriptionInterface";
import { fetchSubscription, fetchSubscriptionHistory } from "./subscriptionThunks";

interface SubscriptionState {
  subscriptionsState: SubscriptionsState;
  subscriptionHistoryState: SubscriptionsHistoryState
}


const initialState: SubscriptionState = {
  subscriptionsState: {
    subscriptionResponse: undefined,
    subscriptionLoadingError: undefined,
    subscriptionLoading: false,
  },
  subscriptionHistoryState: {
    subscriptionHistoryList: undefined,
    subscriptionHistoryLoadingError: undefined,
    subscriptionHistoryLoading: false,
  }
};
const SubscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscription.pending, (state) => {
        state.subscriptionsState.subscriptionLoading = true;
      })
      .addCase(fetchSubscription.fulfilled, (state, action) => {
        state.subscriptionsState.subscriptionLoading = false;
        state.subscriptionsState.subscriptionLoadingError = null;
        const result = action.payload.ids.map((id: number, index: any) =>
          Object.assign({}, { id: id }, action.payload.result[index]),
        );
        const payload = Object.assign({}, action.payload, { result: result });
        state.subscriptionsState.subscriptionResponse = payload;
      })
      .addCase(fetchSubscription.rejected, (state, { payload }) => {
        state.subscriptionsState.subscriptionLoading = false;
        state.subscriptionsState.subscriptionLoadingError = payload;
      })
      .addCase(fetchSubscriptionHistory.pending, (state) => {
        state.subscriptionHistoryState.subscriptionHistoryLoading = true;
      })
      .addCase(fetchSubscriptionHistory.fulfilled, (state, action) => {
        state.subscriptionHistoryState.subscriptionHistoryLoading = false;
        state.subscriptionHistoryState.subscriptionHistoryLoadingError = null;
        state.subscriptionHistoryState.subscriptionHistoryList = action.payload.result;
      })
      .addCase(fetchSubscriptionHistory.rejected, (state, { payload }) => {
        state.subscriptionHistoryState.subscriptionHistoryLoading = false;
        state.subscriptionHistoryState.subscriptionHistoryLoadingError = payload;
      });
  },
});
export default SubscriptionSlice.reducer;
