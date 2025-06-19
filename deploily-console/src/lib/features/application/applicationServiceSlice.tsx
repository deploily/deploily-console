import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApplicationServiceByIdState, ApplicationServicesState, NewApplicationSubscriptionResponse, NewApplicationSubscriptionState } from "./applicationServiceInterface";
import { applicationSubscribe, fetchApplicationServiceById, fetchApplicationServices } from "./applicationServiceThunks";

interface ApplicationServiceState {
    applicationServices: ApplicationServicesState;
    applicationServicesById: ApplicationServiceByIdState;
    newAppSubscriptionState: NewApplicationSubscriptionState;
    newApplicationSubscriptionResponse: NewApplicationSubscriptionResponse;
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
        newSubscriptionResponse: undefined
    },
    newAppSubscriptionState: {
        //TODO PROMOCODE ??
        duration: 1,
        price: 0,
        resource_service_plan: undefined,
        // resource_service_plan_id: undefined,
        app_service_plan: undefined,
        // service_plan_selected_id: undefined,
        totalAmount: 0,
        selectedProfile: undefined,
        isBalanceSufficient: null,
    },

};
const ApplicationServiceSlice = createSlice({
    name: "applicationService",
    initialState,
    reducers: {
        updateNewAppSubscriptionState: (state, action: PayloadAction<any>) => {
            let updatedState: NewApplicationSubscriptionState = { ...state.newAppSubscriptionState, ...action.payload }
            let updatedAmount = 0;
            if (updatedState.app_service_plan != undefined) {
                updatedAmount = updatedState.duration * updatedState.app_service_plan.price;
                updatedState = { ...updatedState, totalAmount: updatedAmount }
                if (updatedState.resource_service_plan != undefined) {
                    updatedAmount += updatedState.duration * updatedState.resource_service_plan.price;
                    updatedState = { ...updatedState, totalAmount: updatedAmount }
                }
            }
            if (state.newAppSubscriptionState?.selectedProfile != undefined) {
                if ((state.newAppSubscriptionState?.selectedProfile.balance - updatedState.totalAmount) >= 0) {
                    updatedState.isBalanceSufficient = true;
                } else {
                    updatedState.isBalanceSufficient = false;
                }
            }
            state.newAppSubscriptionState = updatedState;
            console.log(state.newAppSubscriptionState)
            return state;
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
                    Object.assign({}, { id: id }, action.payload.result[index]),
                );
                const payload = Object.assign({}, action.payload, { result: result });
                state.applicationServices.applicationServicesList = payload;
            })
            .addCase(fetchApplicationServices.rejected, (state, { payload }) => {
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
            })
            .addCase(fetchApplicationServiceById.rejected, (state, { payload }) => {
                state.applicationServicesById.isLoading = false;
                state.applicationServicesById.loadingError = payload;
            })
            .addCase(applicationSubscribe.pending, (state) => {
                    state.newApplicationSubscriptionResponse.newSubscriptionIsLoading = true;
                state.newApplicationSubscriptionResponse.newSubscriptionFailed = false;
                state.newApplicationSubscriptionResponse.newSubscriptionResponse = undefined;
            
                  }) 
            .addCase(applicationSubscribe.fulfilled, (state, { payload }) => {
                state.newApplicationSubscriptionResponse.newSubscriptionIsLoading = false;
                state.newApplicationSubscriptionResponse.newSubscriptionFailed= false;
                state.newApplicationSubscriptionResponse.newSubscriptionResponse = payload;
                  })
            .addCase(applicationSubscribe.rejected, (state) => {
                state.newApplicationSubscriptionResponse.newSubscriptionIsLoading = false;
                state.newApplicationSubscriptionResponse.newSubscriptionFailed = true;
                state.newApplicationSubscriptionResponse.newSubscriptionResponse = undefined;
                  });  
    },
});

export const { updateNewAppSubscriptionState } = ApplicationServiceSlice.actions;

export default ApplicationServiceSlice.reducer;