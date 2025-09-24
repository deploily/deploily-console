import {createSlice, current, PayloadAction} from "@reduxjs/toolkit";
import {
  DeploymentServiceByIdState,
  DeploymentServiceResponseState,
  NewDeploymentSubscriptionState,
} from "./deploymentServiceInterface";
import {fetchDeploymentServiceById, fetchDeploymentServices} from "./deploymentsServiceThunks";
interface DeploymentServiceState {
  deploymentServicesResponse: DeploymentServiceResponseState;
  deploymentServicesByIdResponse: DeploymentServiceByIdState;
  newDeploymentSubscriptionState: NewDeploymentSubscriptionState;
}

const initialState: DeploymentServiceState = {
  deploymentServicesResponse: {
    deploymentServicesList: undefined,
    isLoading: false,
    loadingError: null,
  },

  deploymentServicesByIdResponse: {
    deploymentServiceById: undefined,
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
        updatedState = {...updatedState, totalAmount: updatedAmount};
        if (updatedState.managed_ressource_details != undefined) {
          updatedAmount += updatedState.duration * updatedState.managed_ressource_details.price;
          updatedState = {...updatedState, totalAmount: updatedAmount};
        }
      }

      if (updatedState.promoCodeRate != undefined) {
        updatedState = {...updatedState, promoColor: "green"};
        updatedAmount = updatedAmount - (updatedAmount * (updatedState.promoCodeRate || 0)) / 100;
      }
      updatedState = {...updatedState, totalAmount: updatedAmount};
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
          Object.assign({}, {id: id}, action.payload.result[index]),
        );
        const payload = Object.assign({}, action.payload, {result: result});
        state.deploymentServicesResponse.deploymentServicesList = payload;
      })
      .addCase(fetchDeploymentServices.rejected, (state, {payload}) => {
        state.deploymentServicesResponse.isLoading = false;
        state.deploymentServicesResponse.loadingError = payload;
      })

      .addCase(fetchDeploymentServiceById.pending, (state) => {
        state.deploymentServicesByIdResponse.isLoading = true;
      })
      .addCase(fetchDeploymentServiceById.fulfilled, (state, action) => {
        state.deploymentServicesByIdResponse.isLoading = false;
        state.deploymentServicesByIdResponse.loadingError = null;
        state.deploymentServicesByIdResponse.deploymentServiceById = action.payload.result;
        console.log(action.payload.result);
        console.log("________________________________________________________________________");
        console.log(current(state.newDeploymentSubscriptionState));

        if (
          Array(state.deploymentServicesByIdResponse.deploymentServiceById?.deployment_versions)
            .length > 0
        ) {
          state.newDeploymentSubscriptionState.selected_version =
            state.deploymentServicesByIdResponse.deploymentServiceById?.deployment_versions[0];
        }
      })
      .addCase(fetchDeploymentServiceById.rejected, (state, {payload}) => {
        state.deploymentServicesByIdResponse.isLoading = false;
        state.deploymentServicesByIdResponse.loadingError = payload;
      });
  },
});
export const {updateNewDeploymentSubscriptionState} = DeploymentServiceSlice.actions;

export default DeploymentServiceSlice.reducer;
