import { createSlice } from "@reduxjs/toolkit";
import { ApplicationServiceResponse } from "./applicationServiceInterface";
import { fetchApplicationServices } from "./applicationServiceThunks";

interface ApplicationServiceState {
    applicationServiceResponse?: ApplicationServiceResponse;
    isLoading: boolean;
    applicationServiceLoadingError?: any;
}

const initialState: ApplicationServiceState = {
    applicationServiceResponse: undefined,
    isLoading: false,
    applicationServiceLoadingError: undefined,
};
const ApplicationServiceSlice = createSlice({
    name: "applicationService",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchApplicationServices.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchApplicationServices.fulfilled, (state, action) => {
                state.isLoading = false;
                state.applicationServiceLoadingError = null;
                const result = action.payload.ids.map((id: number, index: any) =>
                    Object.assign({}, { id: id }, action.payload.result[index]),
                );
                const payload = Object.assign({}, action.payload, { result: result });
                state.applicationServiceResponse = payload;
            })
            .addCase(fetchApplicationServices.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.applicationServiceLoadingError = payload;
            });
    },
});
export default ApplicationServiceSlice.reducer;