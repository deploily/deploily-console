import {createSlice} from "@reduxjs/toolkit";
import {
  ApiServiceSubscriptionInterface,
  ApiServiceSubscriptionsResponse,
  NewApiServiceSubscriptionResponse,
  NewUpgradeApiSubscription,
  RenewApiSubscription,
} from "./apiServiceSubscriptionInterface";
import {
  fetchApiServiceSubscription,
  fetchApiServiceSubscriptionById,
  generateTokenThunk,
  postApiServiceSubscription,
  postRenewApiServiceSubscription,
  postUpgradeApiServiceSubscription,
} from "./apiServiceSubscriptionThunks";

interface ApiServiceSubscriptionState {
  apiServiceSubscriptionResponse?: ApiServiceSubscriptionInterface[];
  apiServiceSubscriptionLoadingError?: any;
  apiServiceSubscriptionLoading: boolean;
  currentApiServiceSubscription?: ApiServiceSubscriptionInterface;
  currentApiServiceSubscriptionLoadingError?: any;
  currentApiServiceSubscriptionLoading: boolean;
  generateTokenLoading?: boolean;
  generatedToken?: string;
  generateTokenFailed?: boolean;
  generateTokenSuccess?: boolean;
  isApiServiceSubscriptionCreatedSuccess: boolean;
  isApiServiceSubscriptionCreatedFailed: boolean;
  newApiServiceSubscriptionResponse?: NewApiServiceSubscriptionResponse;
  newUpgradeApiSubscriptionResponse: NewUpgradeApiSubscription;
  renewApiSubscriptionResponse: RenewApiSubscription;
}

const initialState: ApiServiceSubscriptionState = {
  apiServiceSubscriptionResponse: undefined,
  apiServiceSubscriptionLoadingError: undefined,
  apiServiceSubscriptionLoading: false,
  currentApiServiceSubscription: undefined,
  currentApiServiceSubscriptionLoadingError: undefined,
  currentApiServiceSubscriptionLoading: false,
  generateTokenLoading: undefined,
  generatedToken: undefined,
  generateTokenFailed: undefined,
  generateTokenSuccess: undefined,
  isApiServiceSubscriptionCreatedSuccess: false,
  isApiServiceSubscriptionCreatedFailed: false,
  newApiServiceSubscriptionResponse: undefined,

  newUpgradeApiSubscriptionResponse: {
    newUpgradeApiSubscriptionIsLoading: false,
    newpgradeApiSubscriptionFailed: false,
    upgradeApiSubscriptionCreatedSuccess: undefined,
  },
  renewApiSubscriptionResponse: {
    renewApiSubscriptionIsLoading: false,
    renewApiSubscriptionFailed: false,
    renewApiSubscriptionCreatedSuccess: undefined,
  },
};
const apiServiceSubscriptionSlice = createSlice({
  name: "apiServiceSubscription",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiServiceSubscription.pending, (state) => {
        state.newApiServiceSubscriptionResponse = undefined;
        state.apiServiceSubscriptionLoading = true;
      })
      .addCase(fetchApiServiceSubscription.fulfilled, (state, action) => {
        state.apiServiceSubscriptionLoading = false;
        state.apiServiceSubscriptionLoadingError = null;
        state.apiServiceSubscriptionResponse = action.payload.result;
      })
      .addCase(fetchApiServiceSubscription.rejected, (state, {payload}) => {
        state.apiServiceSubscriptionLoading = false;
        state.apiServiceSubscriptionLoadingError = payload;
      })
      .addCase(fetchApiServiceSubscriptionById.pending, (state) => {
        state.newApiServiceSubscriptionResponse = undefined;
        state.currentApiServiceSubscriptionLoading = true;
        state.currentApiServiceSubscriptionLoadingError = null;
        state.generateTokenSuccess = undefined;
      })
      .addCase(fetchApiServiceSubscriptionById.fulfilled, (state, action) => {
        state.currentApiServiceSubscriptionLoading = false;
        state.currentApiServiceSubscriptionLoadingError = null;
        state.currentApiServiceSubscription = action.payload.result;
      })
      .addCase(fetchApiServiceSubscriptionById.rejected, (state, {payload}) => {
        state.currentApiServiceSubscriptionLoading = false;
        state.currentApiServiceSubscriptionLoadingError = payload;
      })
      //GENRATE API TOKEN
      .addCase(generateTokenThunk.pending, (state) => {
        state.newApiServiceSubscriptionResponse = undefined;
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
      .addCase(postApiServiceSubscription.pending, (state) => {
        state.apiServiceSubscriptionLoading = true;
        state.isApiServiceSubscriptionCreatedSuccess = false;
        state.isApiServiceSubscriptionCreatedFailed = false;
      })
      .addCase(postApiServiceSubscription.rejected, (state) => {
        state.apiServiceSubscriptionLoading = false;
        state.isApiServiceSubscriptionCreatedFailed = true;
        state.isApiServiceSubscriptionCreatedSuccess = false;
      })
      .addCase(postApiServiceSubscription.fulfilled, (state, {payload}) => {
        state.apiServiceSubscriptionLoading = false;
        state.isApiServiceSubscriptionCreatedSuccess = true;
        state.newApiServiceSubscriptionResponse = payload;
        state.isApiServiceSubscriptionCreatedFailed = false;
      })
      .addCase(postUpgradeApiServiceSubscription.pending, (state) => {
        state.newUpgradeApiSubscriptionResponse.newUpgradeApiSubscriptionIsLoading = true;
        state.newUpgradeApiSubscriptionResponse.upgradeApiSubscriptionCreatedSuccess = undefined;
        state.newUpgradeApiSubscriptionResponse.newpgradeApiSubscriptionFailed = false;
      })
      .addCase(postUpgradeApiServiceSubscription.rejected, (state) => {
        state.newUpgradeApiSubscriptionResponse.newUpgradeApiSubscriptionIsLoading = false;
        state.newUpgradeApiSubscriptionResponse.newpgradeApiSubscriptionFailed = true;
        state.newUpgradeApiSubscriptionResponse.upgradeApiSubscriptionCreatedSuccess = undefined;
      })
      .addCase(postUpgradeApiServiceSubscription.fulfilled, (state, {payload}) => {
        state.newUpgradeApiSubscriptionResponse.newUpgradeApiSubscriptionIsLoading = false;
        state.newUpgradeApiSubscriptionResponse.upgradeApiSubscriptionCreatedSuccess = payload;
        state.newUpgradeApiSubscriptionResponse.newpgradeApiSubscriptionFailed = false;
      })
      .addCase(postRenewApiServiceSubscription.pending, (state) => {
        state.renewApiSubscriptionResponse.renewApiSubscriptionIsLoading = true;
        state.renewApiSubscriptionResponse.renewApiSubscriptionCreatedSuccess = undefined;
        state.renewApiSubscriptionResponse.renewApiSubscriptionFailed = false;
      })
      .addCase(postRenewApiServiceSubscription.rejected, (state) => {
        state.renewApiSubscriptionResponse.renewApiSubscriptionIsLoading = false;
        state.renewApiSubscriptionResponse.renewApiSubscriptionFailed = true;
        state.renewApiSubscriptionResponse.renewApiSubscriptionCreatedSuccess = undefined;
      })
      .addCase(postRenewApiServiceSubscription.fulfilled, (state, {payload}) => {
        state.renewApiSubscriptionResponse.renewApiSubscriptionIsLoading = false;
        state.renewApiSubscriptionResponse.renewApiSubscriptionCreatedSuccess = payload;
        state.renewApiSubscriptionResponse.renewApiSubscriptionFailed = false;
      });
  },
});
export default apiServiceSubscriptionSlice.reducer;
