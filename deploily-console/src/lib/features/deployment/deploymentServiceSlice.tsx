import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  DeploymentServiceBySlugState,
  DeploymentServiceResponseState,
  NewDeploymentSubscriptionResponse,
  NewDeploymentSubscriptionState
} from "./deploymentServiceInterface";
import { deploymentSubscribe, fetchDeploymentServiceBySlug, fetchDeploymentServices } from "./deploymentsServiceThunks";
interface DeploymentServiceState {
  deploymentServicesResponse: DeploymentServiceResponseState;
  deploymentServicesBySlugResponse: DeploymentServiceBySlugState;
  newDeploymentSubscriptionState: NewDeploymentSubscriptionState;
  newDeploymentSubscriptionResponse: NewDeploymentSubscriptionResponse;
}

const initialState: DeploymentServiceState = {
  deploymentServicesResponse: {
    deploymentServicesList: undefined,
    isLoading: false,
    loadingError: null,
  },

  deploymentServicesBySlugResponse: {
    deploymentServiceBySlug: undefined,
    isLoading: false,
    loadingError: null,
  },
  newDeploymentSubscriptionState: {
    duration: 12,
    price: 0,
    managed_ressource_details: undefined,
    deployment_service_plan: undefined,
    totalAmount: 0,
    selectedProfile: undefined,
    isBalanceSufficient: null,
    selected_version: undefined,
    promoCode: "",
    promoCodeRate: undefined,
    promoColor: undefined,
  },
  newDeploymentSubscriptionResponse: {
    newSubscriptionIsLoading: false,
    newSubscriptionFailed: false,
    newSubscriptionResponse: undefined,
  },
};
const DeploymentServiceSlice = createSlice({
  name: "deploymentService",
  initialState,
  reducers: {
    updateNewDeploymentSubscriptionState: (state, action: PayloadAction<any>) => {
      let updatedState: NewDeploymentSubscriptionState = {
        ...state.newDeploymentSubscriptionState,
        ...action.payload,
      };

      let updatedAmount = 0;
      if (updatedState.deployment_service_plan != undefined) {
        updatedAmount = updatedState.duration * updatedState.deployment_service_plan.price;
        updatedState = { ...updatedState, totalAmount: updatedAmount };
        if (updatedState.managed_ressource_details != undefined) {
          updatedAmount += updatedState.duration * updatedState.managed_ressource_details.price;
          updatedState = { ...updatedState, totalAmount: updatedAmount };
        }
      }

      if (updatedState.promoCodeRate != undefined) {
        updatedState = { ...updatedState, promoColor: "green" };
        updatedAmount = updatedAmount - (updatedAmount * (updatedState.promoCodeRate || 0)) / 100;
      }
      updatedState = { ...updatedState, totalAmount: updatedAmount };
      if (updatedState?.selectedProfile != undefined) {
        if (updatedState?.selectedProfile.balance - updatedState.totalAmount >= 0) {
          updatedState.isBalanceSufficient = true;
        } else {
          updatedState.isBalanceSufficient = false;
        }
      }
      state.newDeploymentSubscriptionState = updatedState;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeploymentServices.pending, (state) => {
        state.deploymentServicesResponse.isLoading = true;
      })
      .addCase(fetchDeploymentServices.fulfilled, (state, action) => {
        state.deploymentServicesResponse.isLoading = false;
        state.deploymentServicesResponse.loadingError = null;
        const result = action.payload.ids.map((id: number, index: any) =>
          Object.assign({}, { id: id }, action.payload.result[index]),
        );
        const payload = Object.assign({}, action.payload, { result: result });
        state.deploymentServicesResponse.deploymentServicesList = payload;
      })
      .addCase(fetchDeploymentServices.rejected, (state, { payload }) => {
        state.deploymentServicesResponse.isLoading = false;
        state.deploymentServicesResponse.loadingError = payload;
      })

      .addCase(fetchDeploymentServiceBySlug.pending, (state) => {
        state.deploymentServicesBySlugResponse.isLoading = true;
      })
      // TODO replace by GetById
      .addCase(fetchDeploymentServiceBySlug.fulfilled, (state, action) => {
        state.deploymentServicesBySlugResponse.isLoading = false;
        state.deploymentServicesBySlugResponse.loadingError = null;
        state.deploymentServicesBySlugResponse.deploymentServiceBySlug = action.payload.result[0];

        // if (
        //   Array(state.deploymentServicesBySlugResponse.deploymentServiceBySlug?.deployment_versions)
        //     .length > 0
        // ) {
        //   state.newDeploymentSubscriptionState.selected_version =
        //     state.deploymentServicesBySlugResponse.deploymentServiceBySlug?.deployment_versions[0];
        // }
      })
      .addCase(fetchDeploymentServiceBySlug.rejected, (state, { payload }) => {
        state.deploymentServicesBySlugResponse.isLoading = false;
        state.deploymentServicesBySlugResponse.loadingError = payload;
      })


      .addCase(deploymentSubscribe.pending, (state) => {
        state.newDeploymentSubscriptionResponse.newSubscriptionIsLoading = true;
        state.newDeploymentSubscriptionResponse.newSubscriptionFailed = false;
        state.newDeploymentSubscriptionResponse.newSubscriptionResponse = undefined;

      })
      .addCase(deploymentSubscribe.fulfilled, (state, { payload }) => {
        state.newDeploymentSubscriptionResponse.newSubscriptionIsLoading = false;
        state.newDeploymentSubscriptionResponse.newSubscriptionFailed = false;
        state.newDeploymentSubscriptionResponse.newSubscriptionResponse = payload;
      })
      .addCase(deploymentSubscribe.rejected, (state) => {
        state.newDeploymentSubscriptionResponse.newSubscriptionIsLoading = false;
        state.newDeploymentSubscriptionResponse.newSubscriptionFailed = true;
        state.newDeploymentSubscriptionResponse.newSubscriptionResponse = undefined;
      });
  },
});
export const { updateNewDeploymentSubscriptionState } = DeploymentServiceSlice.actions;

export default DeploymentServiceSlice.reducer;
