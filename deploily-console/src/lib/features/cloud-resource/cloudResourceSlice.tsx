import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CloudResourceResponse, Filter, MyResourcesList, ProvidersListResponse, ResourceCategoriesResponse, ResourceInterface } from "./cloudResourceInterface";
import { fetchCloudResources, fetchResourceCategories, getMyResources, getProvidersList, getResourceById, postAffiliation } from "./cloudResourceThunks";

interface CloudResourceState {
    cloudResourceResponse?: CloudResourceResponse;
    providersListResponse?: ProvidersListResponse;
    myResourcesResponse?: MyResourcesList[];
    isLoading: boolean;
    cloudResourceLoadingError?: any;
    currentResource?: ResourceInterface;
    resource_id?: number;
    isAffiliationCreatedSuccess: boolean;
    isAffiliationCreatedFailed: boolean;
    searchValue?: string;
    filter?: Filter;
    resourceCategoriesResponse?: ResourceCategoriesResponse;



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
    filter: {},
    resourceCategoriesResponse: undefined,

};
const CloudResourceSlice = createSlice({
    name: "cloudResource",
    initialState,
    reducers: {
        updateCloudResourcesSearchValue: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload;
        },
        updateResourceFilter: (state, action: PayloadAction<Filter>) => {
            state.filter = action.payload;
        }
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
            })


            .addCase(getProvidersList.pending, (state) => {
                state.isLoading = true;
                state.providersListResponse = undefined;
                state.cloudResourceLoadingError = false;
            })
            .addCase(getProvidersList.rejected, (state) => {
                state.isLoading = false;
                state.cloudResourceLoadingError = true;
                state.providersListResponse = undefined;
            })
            .addCase(getProvidersList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.providersListResponse = action.payload;
                state.cloudResourceLoadingError = false;
            })

            .addCase(fetchResourceCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchResourceCategories.fulfilled, (state, action) => {

                state.isLoading = false;
                state.resourceCategoriesResponse = action.payload;
            })
            .addCase(fetchResourceCategories.rejected, (state) => {

                state.isLoading = false;
                state.cloudResourceLoadingError = true;
            });
    },
});

export const { updateCloudResourcesSearchValue, updateResourceFilter } = CloudResourceSlice.actions;

export default CloudResourceSlice.reducer;