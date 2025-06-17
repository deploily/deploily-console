import { createSlice } from "@reduxjs/toolkit";
import { ServicePlan, ServicePlanResponse } from "../service-plans/servicePlanInterface";
import { fetchServicePlansByType } from "./resourceServicesPlansThunk";

interface ServicePlansState {
    servicePlansIsloading: boolean,
    servicePlansList?: ServicePlanResponse,
    servicePlansloadingError: boolean,
}
interface ResourceServicesPlansState {
    servicePlansState: ServicePlansState,
    selectedPlan?: ServicePlan
}

const initialState: ResourceServicesPlansState = {
    servicePlansState: {
        servicePlansIsloading: false,
        servicePlansloadingError: false,
        servicePlansList: undefined
    },
    selectedPlan: undefined,
};
const ResourceServicesPlansSlice = createSlice({
    name: "ResourceServicesPlansState",
    initialState,
    reducers: {
        updateSelectedPlan: (state, action) => {
            state.selectedPlan = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchServicePlansByType.pending, (state) => {
                state.servicePlansState.servicePlansIsloading = true;
            })
            .addCase(fetchServicePlansByType.fulfilled, (state, action) => {
                state.servicePlansState.servicePlansIsloading = false;
                state.servicePlansState.servicePlansloadingError = false;
                const result = action.payload.ids.map((id: number, index: any) =>
                    Object.assign({}, { id: id }, action.payload.result[index]),
                );
                const payload = Object.assign({}, action.payload, { result: result });
                state.servicePlansState.servicePlansList = payload;
            })
            .addCase(fetchServicePlansByType.rejected, (state) => {
                state.servicePlansState.servicePlansIsloading = false;
                state.servicePlansState.servicePlansloadingError = true;
            })
    },
});

export const { updateSelectedPlan } = ResourceServicesPlansSlice.actions;

export default ResourceServicesPlansSlice.reducer;