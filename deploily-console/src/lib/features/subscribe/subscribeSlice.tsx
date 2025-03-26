import { createSlice } from "@reduxjs/toolkit";
import { NewSubscribeResponse, SubscribeInterface, SubscribeResponse } from "./subscribeInterface";
import { fetchSubscribe, fetchSubscribeById, generateTokenThunk, postSubscribe } from "./subscribeThunks";

interface SubscribeState {
  subscribeResponse?: SubscribeResponse;
  subscribeLoadingError?: any;
  subscribeLoading: boolean;
  currentSubscribe?: SubscribeInterface;
  currentSubscribeLoadingError?: any;
  currentSubscribeLoading: boolean;
  generateTokenLoading?: boolean;
  generatedToken?: string;
  generateTokenFailed?: boolean;
  isSubscribeCreatedSuccess: boolean;
  isSubscribeCreatedFailed: boolean;
  newSubscribeResponse?: NewSubscribeResponse;
}

const initialState: SubscribeState = {
  subscribeResponse: undefined,
  subscribeLoadingError: undefined,
  subscribeLoading: false,
  currentSubscribe: undefined,
  currentSubscribeLoadingError: undefined,
  currentSubscribeLoading: false,
  generateTokenLoading: undefined,
  generatedToken: undefined,
  generateTokenFailed: undefined,
  isSubscribeCreatedSuccess: false,
  isSubscribeCreatedFailed: false,
  newSubscribeResponse: undefined,
};
const SubscribeSlice = createSlice({
  name: "subscribe",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscribe.pending, (state) => {
        state.subscribeLoading = true;
      })
      .addCase(fetchSubscribe.fulfilled, (state, action) => {
        state.subscribeLoading = false;
        state.subscribeLoadingError = null;
        const result = action.payload.ids.map((id: number, index: any) =>
          Object.assign({}, { id: id }, action.payload.result[index]),
        );
        const payload = Object.assign({}, action.payload, { result: result });
        state.subscribeResponse = payload;
      })
      .addCase(fetchSubscribe.rejected, (state, { payload }) => {
        state.subscribeLoading = false;
        state.subscribeLoadingError = payload;
      })
      .addCase(fetchSubscribeById.pending, (state) => {
        state.currentSubscribeLoading = true;
        state.currentSubscribeLoadingError = null;
      })
      .addCase(fetchSubscribeById.fulfilled, (state, action) => {
        state.currentSubscribeLoading = false;
        state.currentSubscribeLoadingError = null;
        state.currentSubscribe = { ...action.payload.result, ...{ id: action.payload.id } };
      })
      .addCase(fetchSubscribeById.rejected, (state, { payload }) => {
        state.currentSubscribeLoading = false;
        state.currentSubscribeLoadingError = payload;
      })
      //GENRATE API TOKEN 
      .addCase(generateTokenThunk.pending, (state) => {
        state.generateTokenLoading = true;
        state.generatedToken = undefined;
      })
      .addCase(generateTokenThunk.fulfilled, (state, action) => {
        state.generateTokenLoading = false;
        state.generatedToken = action.payload;
      })
      .addCase(generateTokenThunk.rejected, (state) => {
        state.generateTokenLoading = false;
        state.generateTokenFailed = true;
      })
      .addCase(postSubscribe.pending, (state) => {
        state.subscribeLoading = true;
        state.isSubscribeCreatedSuccess = false;
        state.isSubscribeCreatedFailed = false;

      })
      .addCase(postSubscribe.rejected, (state) => {
        state.subscribeLoading = false;
        state.isSubscribeCreatedFailed = true;
        state.isSubscribeCreatedSuccess = false;
      })
      .addCase(postSubscribe.fulfilled, (state, { payload }) => {
        state.subscribeLoading = false;
        state.isSubscribeCreatedSuccess = true;
        state.newSubscribeResponse = payload;
        state.isSubscribeCreatedFailed = false;
      });
  },
});
export default SubscribeSlice.reducer;
