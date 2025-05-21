import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CloudResourceResponse, MyResourcesList, ResourceInterface } from "./cloudResourceInterface";
import { fetchCloudResources, getMyResources, getResourceById, postAffiliation } from "./cloudResourceThunks";

interface CloudResourceState {
    cloudResourceResponse?: CloudResourceResponse;
    myResourcesResponse?: MyResourcesList[];
    isLoading: boolean;
    cloudResourceLoadingError?: any;
    currentResource?: ResourceInterface;
    resource_id?: number;
    isAffiliationCreatedSuccess: boolean;
    isAffiliationCreatedFailed: boolean;
    searchValue?: string;


}

const initialState: CloudResourceState = {
    cloudResourceResponse: undefined,
    myResourcesResponse: undefined,
    isLoading: false,
    currentResource: undefined,
    cloudResourceLoadingError: undefined,
    resource_id: undefined,
    isAffiliationCreatedSuccess: false,
    isAffiliationCreatedFailed: false,
    searchValue: "",

};
const CloudResourceSlice = createSlice({
    name: "cloudResource",
    initialState,
    reducers: {
        updateCloudResourcesSearchValue: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchCloudResources.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCloudResources.fulfilled, (state, action) => {
                state.isAffiliationCreatedSuccess = false;
                state.isLoading = false;
                state.cloudResourceLoadingError = null;
                const result = action.payload.ids.map((id: number, index: any) =>
                    Object.assign({}, { id: id }, action.payload.result[index]),
                );
                const payload = Object.assign({}, action.payload, { result: result });
                state.cloudResourceResponse = payload;
            })
            .addCase(fetchCloudResources.rejected, (state, { payload }) => {
                state.isAffiliationCreatedSuccess = false;
                state.isLoading = false;
                state.cloudResourceLoadingError = payload;
            })
            .addCase(getResourceById.pending, (state) => {
                state.isAffiliationCreatedSuccess = false;
                state.isLoading = true;
                state.cloudResourceLoadingError = null;
            })
            .addCase(getResourceById.fulfilled, (state, action) => {
                state.isAffiliationCreatedSuccess = false;
                state.isLoading = false;
                state.cloudResourceLoadingError = null;
                state.currentResource = { ...action.payload.result, ...{ id: action.payload.id } };
                state.resource_id = action.payload.id;
            })
            .addCase(getResourceById.rejected, (state, { payload }) => {
                state.isAffiliationCreatedSuccess = false;
                state.isLoading = false;
                state.cloudResourceLoadingError = payload;
            })

            .addCase(postAffiliation.pending, (state) => {
                state.isAffiliationCreatedSuccess = false;
                state.isLoading = true;
                state.isAffiliationCreatedSuccess = false;
                state.isAffiliationCreatedFailed = false;
            })
            .addCase(postAffiliation.rejected, (state) => {
                state.isLoading = false;
                state.isAffiliationCreatedFailed = true;
                state.isAffiliationCreatedSuccess = false;
            })
            .addCase(postAffiliation.fulfilled, (state) => {
                state.isLoading = false;
                state.isAffiliationCreatedSuccess = true;
                state.isAffiliationCreatedFailed = false;
            })

            .addCase(getMyResources.pending, (state) => {
                state.isAffiliationCreatedSuccess = false;
                state.isLoading = true;
                state.myResourcesResponse = undefined;
                state.cloudResourceLoadingError = false;
            })
            .addCase(getMyResources.rejected, (state) => {
                state.isAffiliationCreatedSuccess = false;
                state.isLoading = false;
                state.cloudResourceLoadingError = true;
                state.myResourcesResponse = undefined;
            })
            .addCase(getMyResources.fulfilled, (state, action) => {
                state.isAffiliationCreatedSuccess = false;
                state.isLoading = false;
                state.myResourcesResponse = action.payload;
                state.cloudResourceLoadingError = false;
            });
    },
});

export const { updateCloudResourcesSearchValue } = CloudResourceSlice.actions;

export default CloudResourceSlice.reducer;