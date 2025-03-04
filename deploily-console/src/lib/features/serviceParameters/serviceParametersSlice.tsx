import { createSlice } from "@reduxjs/toolkit";
import { fetchServiceParameters } from "./serviceParametersThunks";
import { ServiceParametersResponse } from "./serviceParametersInterface";

interface ServiceParametersState {
  serviceParametersList?: ServiceParametersResponse;
  isLoading: boolean;
  serviceParametersListLoadingError?: any;
}

const initialState: ServiceParametersState = {
  serviceParametersList: undefined,
  isLoading: false,
  serviceParametersListLoadingError: undefined
};
const ServiceParametersSlice = createSlice({
  name: "FavoriteService",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServiceParameters.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchServiceParameters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.serviceParametersListLoadingError = null;
        const result = action.payload.ids.map((id: number, index: any) =>
          Object.assign({}, { id: id }, action.payload.result[index]),
        );
        const payload = Object.assign({}, action.payload, { result: result });
        state.serviceParametersList = payload;
      })
      .addCase(fetchServiceParameters.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.serviceParametersListLoadingError = payload;
      });
  },
});
export default ServiceParametersSlice.reducer;
