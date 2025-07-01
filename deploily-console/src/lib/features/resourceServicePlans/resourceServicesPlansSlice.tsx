import { createSlice } from "@reduxjs/toolkit";
import { ServicePlan, ServicePlanResponse } from "../service-plans/servicePlanInterface";
import { fetchServicePlansByType } from "./resourceServicesPlansThunk";

interface ServicePlansState {
    servicePlansIsloading: boolean,
    servicePlansList?: ServicePlanResponse,
    servicePlansloadingError: boolean,
    pagination: {
        current: number,
        pageSize: number,
        total: number
    }
}
interface ResourceServicesPlansState {
    servicePlansState: ServicePlansState,
    selectedPlan?: ServicePlan
}

const initialState: ResourceServicesPlansState = {
    servicePlansState: {
        servicePlansIsloading: false,
        servicePlansloadingError: false,
        servicePlansList: undefined,
        pagination: {
            current: 1,
            pageSize: 10,
            total: 0
        }
    },
    selectedPlan: undefined,
};
const ResourceServicesPlansSlice = createSlice({
    name: "resourceServicesPlansSlice",
    initialState,
    reducers: {
        updateSelectedPlan: (state, action) => {
            state.selectedPlan = action.payload;
        },
        updatePaginationParams: (state, action) => {
            state.servicePlansState.pagination.pageSize = action.payload.pageSize;
            state.servicePlansState.pagination.current = action.payload.current;
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
                state.servicePlansState.pagination.total = state.servicePlansState.servicePlansList?.count ?? 0;
            })
            .addCase(fetchServicePlansByType.rejected, (state) => {
                state.servicePlansState.servicePlansIsloading = false;
                state.servicePlansState.servicePlansloadingError = true;
            })
    },
});

export const { updateSelectedPlan, updatePaginationParams } = ResourceServicesPlansSlice.actions;

export default ResourceServicesPlansSlice.reducer;