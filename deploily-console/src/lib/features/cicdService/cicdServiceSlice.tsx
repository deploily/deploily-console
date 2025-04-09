import { createSlice } from "@reduxjs/toolkit";
import { CiCdServiceResponse } from "./cicdServiceInterface";
import { fetchCiCdServices } from "./cicdServiceThunks";

interface CiCdServiceState {
    cicdServiceResponse?: CiCdServiceResponse;
    isLoading: boolean;
    cicdServiceLoadingError?: any;
}

const initialState: CiCdServiceState = {
    cicdServiceResponse: undefined,
    isLoading: false,
    cicdServiceLoadingError: undefined,
};
const CiCdServiceSlice = createSlice({
    name: "cicdService",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCiCdServices.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCiCdServices.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cicdServiceLoadingError = null;
                const result = action.payload.ids.map((id: number, index: any) =>
                    Object.assign({}, { id: id }, action.payload.result[index]),
                );
                const payload = Object.assign({}, action.payload, { result: result });
                state.cicdServiceResponse = payload;
            })
            .addCase(fetchCiCdServices.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.cicdServiceLoadingError = payload;
            });
    },
});
export default CiCdServiceSlice.reducer;