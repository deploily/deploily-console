import { createSlice } from "@reduxjs/toolkit";
import {  ProvidersResponse } from "./providerInterface";
import { ServicePlanResponse } from "../service-plans/servicePlanInterface";
import { fetchCloudResourcesByProviderId, fetchPlansByResourceId, getProvidersList } from "./providerThunk";
import { CloudResourceResponse } from "../cloud-resource/cloudResourceInterface";

interface ProviderState {

    providersIsloading: boolean;
    providersList?: ProvidersResponse;
    providersloadingError: boolean;

    resourcesIsloading: boolean;
    resourcesListByProviderId?: CloudResourceResponse;
    resourcesloadingError: boolean;

    servicePlanIsloading: boolean;
    servicePlansByResourceId?: ServicePlanResponse;
    servicePlanloadingError: boolean;

    selectedValues:{
        providerId?: number;
        resourceId?: number;
        planId?: number;
    }
}

const initialState: ProviderState = {
    providersIsloading: false,
    providersList: undefined,
    providersloadingError: false,

    resourcesIsloading: false,
    resourcesListByProviderId: undefined,
    resourcesloadingError: false,

    servicePlanIsloading: false,
    servicePlansByResourceId: undefined,
    servicePlanloadingError: false,

    selectedValues: {
        providerId: undefined,
        resourceId: undefined,
        planId: undefined,
    },
};
const ProviderSlice = createSlice({
    name: "providerState",
    initialState,
    reducers: {
        updateSelectedValues: (state, action) => {    
            state.selectedValues = {... state.selectedValues,...action.payload};
        },   
    },

    extraReducers: (builder) => {
        builder
            .addCase(getProvidersList.pending, (state) => {
                state.providersIsloading = true;
            })
            .addCase(getProvidersList.fulfilled, (state, action) => {
                state.providersIsloading = false;
                state.providersloadingError = false;
                const result = action.payload.ids.map((id: number, index: any) =>
                    Object.assign({}, { id: id }, action.payload.result[index]),
                );
                const payload = Object.assign({}, action.payload, { result: result });
                state.providersList = payload;
            })
            .addCase(getProvidersList.rejected, (state) => {
                state.providersIsloading = false;
                state.providersloadingError = true;
            }) 

            .addCase(fetchCloudResourcesByProviderId.pending, (state) => {
                state.resourcesIsloading = true;
            })
            .addCase(fetchCloudResourcesByProviderId.fulfilled, (state, action) => {
                state.resourcesIsloading = false;
                state.resourcesloadingError = false;
                const result = action.payload.ids.map((id: number, index: any) =>
                    Object.assign({}, { id: id }, action.payload.result[index]),
                );
                const payload = Object.assign({}, action.payload, { result: result });
                state.resourcesListByProviderId = payload;
            })
            .addCase(fetchCloudResourcesByProviderId.rejected, (state) => {
                state.resourcesIsloading = false;
                state.resourcesloadingError = true;
            })

            .addCase(fetchPlansByResourceId.pending, (state) => {
                state.servicePlanIsloading = true;
            })
            .addCase(fetchPlansByResourceId.fulfilled, (state, action) => {
                state.servicePlanIsloading = false;
                state.servicePlanloadingError = false;
                const result = action.payload.ids.map((id: number, index: any) =>
                    Object.assign({}, { id: id }, action.payload.result[index]),
                );
                const payload = Object.assign({}, action.payload, { result: result });
                state.servicePlansByResourceId = payload;
            })
            .addCase(fetchPlansByResourceId.rejected, (state) => {
                state.servicePlanIsloading = false;
                state.servicePlanloadingError = true;
            })
       

           
    },
});

export const { updateSelectedValues } = ProviderSlice.actions;

export default ProviderSlice.reducer;