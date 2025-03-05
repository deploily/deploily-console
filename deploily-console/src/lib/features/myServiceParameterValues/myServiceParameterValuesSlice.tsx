import { createSlice } from "@reduxjs/toolkit";
import { fetchServiceParametersValues } from "./myServiceParameterValuesThunks";
import { ServiceParametersValuesResponse } from "./myServiceParameterValuesInterface";

interface ServiceParametersValuesState {
  serviceParameterValuesList?: ServiceParametersValuesResponse;
  isLoading: boolean;
  serviceParameterValuesListLoadingError?: any;
}

const initialState: ServiceParametersValuesState = {
  serviceParameterValuesList: undefined,
  isLoading: false,
  serviceParameterValuesListLoadingError: undefined
};
const ServiceParametersValuesSlice = createSlice({
  name: "FavoriteService",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServiceParametersValues.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchServiceParametersValues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.serviceParameterValuesListLoadingError = null;
        const result = action.payload.ids.map((id: number, index: any) =>
          Object.assign({}, { id: id }, action.payload.result[index]),
        );
        const payload = Object.assign({}, action.payload, { result: result });
        state.serviceParameterValuesList = payload;
      })
      .addCase(fetchServiceParametersValues.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.serviceParameterValuesListLoadingError = payload;
      });
  },
});
export default ServiceParametersValuesSlice.reducer;
