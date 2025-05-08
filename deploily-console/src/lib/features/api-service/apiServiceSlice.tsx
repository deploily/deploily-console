import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiServiceInterface, ApiServiceResponse } from "./apiServiceInterface";
import { fetchApiServices, getApiServiceById } from "./apiServiceThunks";

interface ApiServiceState {
  apiServiceResponse?: ApiServiceResponse;
  isLoadingServiceResponse: boolean;
  apiServiceLoadingError?: any;
  serviceLoading: boolean;
  currentService?: ApiServiceInterface;
  currentServiceError?: any;
  service_id?: number;
  searchValue?: string;
}

const initialState: ApiServiceState = {
  apiServiceResponse: undefined,
  isLoadingServiceResponse: false,
  apiServiceLoadingError: undefined,
  serviceLoading: false,
  currentServiceError: undefined,
  service_id: undefined,
  searchValue: "",
};
const ApiServiceSlice = createSlice({
  name: "apiService",
  initialState,
  reducers: {
    updateApiServiceSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiServices.pending, (state) => {
        state.isLoadingServiceResponse = true;
      })
      .addCase(fetchApiServices.fulfilled, (state, action) => {
        state.isLoadingServiceResponse = false;
        state.apiServiceLoadingError = null;
        const result = action.payload.ids.map((id: number, index: any) =>
          Object.assign({}, { id: id }, action.payload.result[index]),
        );
        const payload = Object.assign({}, action.payload, { result: result });
        state.apiServiceResponse = payload;
      })
      .addCase(fetchApiServices.rejected, (state, { payload }) => {
        state.isLoadingServiceResponse = false;
        state.apiServiceLoadingError = payload;
      })
      //CHECK IF SERVICE EXIST OR NOT
      .addCase(getApiServiceById.pending, (state) => {
        state.serviceLoading = true;
        state.currentServiceError = null;
      })
      .addCase(getApiServiceById.fulfilled, (state, action) => {
        state.serviceLoading = false;
        state.currentServiceError = null;
        state.currentService = { ...action.payload.result, ...{ id: action.payload.id } };
        state.service_id = action.payload.id;
      })
      .addCase(getApiServiceById.rejected, (state, { payload }) => {
        state.serviceLoading = false;
        state.currentServiceError = payload;
      });
  },
});
export const { updateApiServiceSearchValue } = ApiServiceSlice.actions;
export default ApiServiceSlice.reducer;
