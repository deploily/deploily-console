import { createSlice } from "@reduxjs/toolkit";
import { CloudResourceResponse, ResourceInterface } from "./cloudResourceInterface";
import { fetchCloudResources, getResourceById } from "./cloudResourceThunks";

interface CloudResourceState {
    cloudResourceResponse?: CloudResourceResponse;
    isLoading: boolean;
    cloudResourceLoadingError?: any;
    currentResource?: ResourceInterface;
    resource_id?: number;

}

const initialState: CloudResourceState = {
    cloudResourceResponse: undefined,
    isLoading: false,
    currentResource: undefined,
    cloudResourceLoadingError: undefined,
    resource_id: undefined,
};
const CloudResourceSlice = createSlice({
    name: "cloudResource",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCloudResources.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCloudResources.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cloudResourceLoadingError = null;
                const result = action.payload.ids.map((id: number, index: any) =>
                    Object.assign({}, { id: id }, action.payload.result[index]),
                );
                const payload = Object.assign({}, action.payload, { result: result });
                state.cloudResourceResponse = payload;
            })
            .addCase(fetchCloudResources.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.cloudResourceLoadingError = payload;
            })
            .addCase(getResourceById.pending, (state) => {
                state.isLoading = true;
                state.cloudResourceLoadingError = null;
            })
            .addCase(getResourceById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cloudResourceLoadingError = null;
                state.currentResource = { ...action.payload.result, ...{ id: action.payload.id } };
                state.resource_id = action.payload.id;
            })
            .addCase(getResourceById.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.cloudResourceLoadingError = payload;
            });
    },
});
export default CloudResourceSlice.reducer;