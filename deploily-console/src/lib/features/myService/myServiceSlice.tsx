import {createSlice} from "@reduxjs/toolkit";
import { myServiceResponse } from "./myServiceInterface";
import { fetchMyServices } from "./myServiceThunks";

interface MyServiceState {
  myServiceResponse?: myServiceResponse;
  myServiceLoadingError?: any;
  myServiceLoading: boolean;
  
}

const initialState: MyServiceState = {
  myServiceResponse: undefined,
  myServiceLoadingError: undefined,
  myServiceLoading: false,
};
const MyServiceSlice = createSlice({
  name: "myService",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyServices.pending, (state) => {
        state.myServiceLoading = true;
      })
      .addCase(fetchMyServices.fulfilled, (state, action) => {
        state.myServiceLoading = false;
        state.myServiceLoadingError = null;
        const result = action.payload.ids.map((id: number, index: any) =>
          Object.assign({}, {id: id}, action.payload.result[index]),
        );
        const payload = Object.assign({}, action.payload, {result: result});
        state.myServiceResponse = payload;
      })
      .addCase(fetchMyServices.rejected, (state, {payload}) => {
        state.myServiceLoading = false;
        state.myServiceLoadingError = payload;
      })
      
  },
});
export default MyServiceSlice.reducer;
