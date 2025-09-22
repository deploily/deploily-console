import { createSlice } from "@reduxjs/toolkit";
import { DeploymentServiceByIdState, DeploymentServiceResponseState } from "./deploymentServiceInterface";
import { fetchDeploymentServiceById, fetchDeploymentServices } from "./deploymentsServiceThunks";

interface DeploymentServiceState {
    deploymentServicesResponse: DeploymentServiceResponseState;
    deploymentServicesByIdResponse: DeploymentServiceByIdState;
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
};
const DeploymentServiceSlice = createSlice({
    name: "deploymentService",
    initialState,
    reducers: {},
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

            .addCase(fetchDeploymentServiceById.pending, (state) => {
                state.deploymentServicesByIdResponse.isLoading = true;
            })
            .addCase(fetchDeploymentServiceById.fulfilled, (state, action) => {
                state.deploymentServicesByIdResponse.isLoading = false;
                state.deploymentServicesByIdResponse.loadingError = null;
                state.deploymentServicesByIdResponse.deploymentServiceById = action.payload.result;
                // if (Array(state.applicationServicesById.applicationServiceById?.app_versions).length > 0) {
                //     state.newAppSubscriptionState.selected_version = state.applicationServicesById.applicationServiceById?.app_versions[0];
                // }

            })
            .addCase(fetchDeploymentServiceById.rejected, (state, { payload }) => {
                state.deploymentServicesByIdResponse.isLoading = false;
                state.deploymentServicesByIdResponse.loadingError = payload;
            });
    },
});
export default DeploymentServiceSlice.reducer;