import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
  ApplicationServiceByIdState,
  ApplicationServicesState,
  NewApplicationSubscriptionResponse,
  NewApplicationSubscriptionState,
} from "./applicationServiceInterface";
import {
  applicationSubscribe,
  fetchApplicationServiceById,
  fetchApplicationServices,
} from "./applicationServiceThunks";

interface ApplicationServiceState {
  applicationServices: ApplicationServicesState;
  applicationServicesById: ApplicationServiceByIdState;
  newAppSubscriptionState: NewApplicationSubscriptionState;
  newApplicationSubscriptionResponse: NewApplicationSubscriptionResponse;
  searchValue?: string;
}

const initialState: ApplicationServiceState = {
  applicationServices: {
    applicationServicesList: undefined,
    isLoading: false,
    loadingError: null,
  },
  applicationServicesById: {
    applicationServiceById: undefined,
    isLoading: false,
    loadingError: null,
  },
  newApplicationSubscriptionResponse: {
    newSubscriptionIsLoading: false,
    newSubscriptionFailed: false,
    newSubscriptionResponse: undefined,
  },
  newAppSubscriptionState: {
    duration: 12,
    price: 0,
    managed_ressource_details: undefined,
    // resource_service_plan_id: undefined,
    app_service_plan: undefined,
    // service_plan_selected_id: undefined,
    totalAmount: 0,
    selectedProfile: undefined,
    isBalanceSufficient: null,
    selected_version: undefined,
    promoCode: "",
    promoCodeRate: undefined,
    promoColor: undefined,
  },
  searchValue: "",
};
const ApplicationServiceSlice = createSlice({
  name: "applicationService",
  initialState,
  reducers: {
    updateNewAppSubscriptionState: (state, action: PayloadAction<any>) => {
      let updatedState: NewApplicationSubscriptionState = {
        ...state.newAppSubscriptionState,
        ...action.payload,
      };

      let updatedAmount = 0;

      if (updatedState.app_service_plan) {
        updatedAmount = updatedState.duration * updatedState.app_service_plan.price;
      }
      if (
        updatedState.managed_ressource_details &&
        !updatedState.managed_ressource_details.isAlreadyPaid // 👈 condition
      ) {
        updatedAmount +=
          updatedState.duration * (updatedState.managed_ressource_details.price || 0);
      }
      if (updatedState.promoCodeRate !== undefined) {
        updatedState = {...updatedState, promoColor: "green"};
        updatedAmount = updatedAmount - (updatedAmount * (updatedState.promoCodeRate || 0)) / 100;
      }
      updatedState = {...updatedState, totalAmount: updatedAmount};

      if (updatedState.selectedProfile) {
        updatedState.isBalanceSufficient =
          updatedState.selectedProfile.balance - updatedState.totalAmount >= 0;
      }

      state.newAppSubscriptionState = updatedState;
      return state;
    },

    updateApplicationServiceSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplicationServices.pending, (state) => {
        state.applicationServices.isLoading = true;
      })
      .addCase(fetchApplicationServices.fulfilled, (state, action) => {
        state.applicationServices.isLoading = false;
        state.applicationServices.loadingError = null;
        const result = action.payload.ids.map((id: number, index: any) =>
          Object.assign({}, {id: id}, action.payload.result[index]),
        );
        const payload = Object.assign({}, action.payload, {result: result});
        state.applicationServices.applicationServicesList = payload;
      })
      .addCase(fetchApplicationServices.rejected, (state, {payload}) => {
        state.applicationServices.isLoading = false;
        state.applicationServices.loadingError = payload;
      })
      .addCase(fetchApplicationServiceById.pending, (state) => {
        state.applicationServicesById.isLoading = true;
      })
      .addCase(fetchApplicationServiceById.fulfilled, (state, action) => {
        state.applicationServicesById.isLoading = false;
        state.applicationServicesById.loadingError = null;
        state.applicationServicesById.applicationServiceById = action.payload.result;
        if (Array(state.applicationServicesById.applicationServiceById?.app_versions).length > 0) {
          state.newAppSubscriptionState.selected_version =
            state.applicationServicesById.applicationServiceById?.app_versions[0];
        }
      })
      .addCase(fetchApplicationServiceById.rejected, (state, {payload}) => {
        state.applicationServicesById.isLoading = false;
        state.applicationServicesById.loadingError = payload;
      })
      .addCase(applicationSubscribe.pending, (state) => {
        state.newApplicationSubscriptionResponse.newSubscriptionIsLoading = true;
        state.newApplicationSubscriptionResponse.newSubscriptionFailed = false;
        state.newApplicationSubscriptionResponse.newSubscriptionResponse = undefined;
      })
      .addCase(applicationSubscribe.fulfilled, (state, {payload}) => {
        state.newApplicationSubscriptionResponse.newSubscriptionIsLoading = false;
        state.newApplicationSubscriptionResponse.newSubscriptionFailed = false;
        state.newApplicationSubscriptionResponse.newSubscriptionResponse = payload;
      })
      .addCase(applicationSubscribe.rejected, (state) => {
        state.newApplicationSubscriptionResponse.newSubscriptionIsLoading = false;
        state.newApplicationSubscriptionResponse.newSubscriptionFailed = true;
        state.newApplicationSubscriptionResponse.newSubscriptionResponse = undefined;
      });
  },
});

export const {updateNewAppSubscriptionState, updateApplicationServiceSearchValue} =
  ApplicationServiceSlice.actions;

export default ApplicationServiceSlice.reducer;
