import {createSlice} from "@reduxjs/toolkit";
import {ApiServiceResponse} from "./apiServiceInterface";
import {fetchApiServices} from "./apiServiceThunks";

interface ApiServiceState {
  apiServiceResponse?: ApiServiceResponse;
  isLoading: boolean;
  apiServiceLoadingError?: any;
}

const initialState: ApiServiceState = {
  apiServiceResponse: undefined,
  isLoading: false,
  apiServiceLoadingError: null,
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
      });
  },
});
export default ApiServiceSlice.reducer;
