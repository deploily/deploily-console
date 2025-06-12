import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApplicationServiceByIdState, ApplicationServicesState, NewApplicationSubscriptionState } from "./applicationServiceInterface";
import { fetchApplicationServiceById, fetchApplicationServices } from "./applicationServiceThunks";

interface ApplicationServiceState {
    applicationServices: ApplicationServicesState;
    applicationServicesById: ApplicationServiceByIdState;
    newAppSubscriptionState: NewApplicationSubscriptionState;

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
    newAppSubscriptionState: {
        duration: 1,
        price: 0,
        resource_service_plan_id: undefined,
        service_plan_selected_id: undefined,
        totalAmount: 0,
        selectedProfile: undefined,
        isBalanceSufficient: null,
    },

};
const ApplicationServiceSlice = createSlice({
    name: "applicationService",
    initialState,
    reducers: {
        updateApiServiceSearchValue: (state, action: PayloadAction<any>) => {
            //TODO : RECHECK THIS FUNCTION & ADD RESOURCE PALN PRICE TO THE PRICE CALCULATION
            let updatedState = { ...state.newAppSubscriptionState, ...action.payload }
            const updatedAmount = updatedState.duration * updatedState.price
            updatedState = { ...updatedState, totalAmount: updatedAmount }

            if (state.newAppSubscriptionState?.selectedProfile != undefined) {
                if ((state.newAppSubscriptionState?.selectedProfile.balance - updatedState.totalAmount) >= 0) {
                    updatedState.newAppSubscriptionState.isBalanceSufficient = true;
                } else {
                    updatedState.newAppSubscriptionState.isBalanceSufficient = false;
                }
            }
            state.newAppSubscriptionState = updatedState;
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
                state.applicationServicesById.applicationServiceById = action.payload;
            })
            .addCase(fetchApplicationServiceById.rejected, (state, { payload }) => {
                state.applicationServicesById.isLoading = false;
                state.applicationServicesById.loadingError = payload;
            });
    },
});

export const { updateApiServiceSearchValue } = ApplicationServiceSlice.actions;

export default ApplicationServiceSlice.reducer;