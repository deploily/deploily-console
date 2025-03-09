import { createSlice } from "@reduxjs/toolkit";
import { MyServiceResponse } from "./myServiceInterface";
import { fetchMyServices } from "./myServiceThunks";

interface MyServiceState {
  MyServiceResponse?: MyServiceResponse;
  myServiceLoadingError?: any;
  myServiceLoading: boolean;

}

const initialState: MyServiceState = {
  MyServiceResponse: undefined,
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
          Object.assign({}, { id: id }, action.payload.result[index]),
        );
        const payload = Object.assign({}, action.payload, { result: result });
        state.MyServiceResponse = payload;
      })
      .addCase(fetchMyServices.rejected, (state, { payload }) => {
        state.myServiceLoading = false;
        state.myServiceLoadingError = payload;
      })

  },
});
export default MyServiceSlice.reducer;
