import {createSlice} from "@reduxjs/toolkit";
import {ApiServiceInterface, ApiServiceResponse} from "./apiServiceInterface";
import {fetchApiServices, getApiServiceById} from "./apiServiceThunks";

interface ApiServiceState {
  apiServiceResponse?: ApiServiceResponse;
  isLoading: boolean;
  apiServiceLoadingError?: any;
  serviceLoading: boolean;
  currentService?: ApiServiceInterface;
  service_id?: number;
}

const initialState: ApiServiceState = {
  apiServiceResponse: undefined,
  isLoading: false,
  apiServiceLoadingError: undefined,
  serviceLoading: false,
  service_id: undefined,
};
const ApiServiceSlice = createSlice({
  name: "apiService",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiServices.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchApiServices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.apiServiceLoadingError = null;
        const result = action.payload.ids.map((id: number, index: any) =>
          Object.assign({}, {id: id}, action.payload.result[index]),
        );
        const payload = Object.assign({}, action.payload, {result: result});
        state.apiServiceResponse = payload;
      })
      .addCase(fetchApiServices.rejected, (state, {payload}) => {
        state.isLoading = false;
        state.apiServiceLoadingError = payload;
      })
      //CHECK IF SERVICE EXIST OR NOT
      .addCase(getApiServiceById.pending, (state) => {
        state.serviceLoading = true;
        state.apiServiceLoadingError = null;
      })
      .addCase(getApiServiceById.fulfilled, (state, action) => {
        state.serviceLoading = false;
        state.apiServiceLoadingError = null;
        state.currentService = {...action.payload.result, ...{id: action.payload.id}};
        state.service_id = action.payload.id;
      })
      .addCase(getApiServiceById.rejected, (state, {payload}) => {
        state.serviceLoading = false;
        state.apiServiceLoadingError = payload;
      });
  },
});
export default ApiServiceSlice.reducer;
