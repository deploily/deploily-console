import { createSlice } from "@reduxjs/toolkit";
import { CloudResourceResponse } from "./cloudResourceInterface";
import { fetchCloudResources } from "./cloudResourceThunks";

interface CloudResourceState {
    cloudResourceResponse?: CloudResourceResponse;
    isLoading: boolean;
    cloudResourceLoadingError?: any;
}

const initialState: CloudResourceState = {
    cloudResourceResponse: undefined,
    isLoading: false,
    cloudResourceLoadingError: undefined,
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
            });
    },
});
export default CloudResourceSlice.reducer;