import { createSlice } from "@reduxjs/toolkit";
import { MyServiceInterface, MyServiceResponse } from "./myServiceInterface";
import { fetchMyServices, fetchMyServiceById, generateTokenThunk } from "./myServiceThunks";

interface MyServiceState {
  myServiceResponse?: MyServiceResponse;
  myServiceLoadingError?: any;
  myServiceLoading: boolean;
  currentMyService?: MyServiceInterface;
  currentMyServiceLoadingError?: any;
  currentMyServiceLoading: boolean;
  cartLine_id?: number;
  generateTokenLoading?: boolean;
  generatedToken?: string;
  generateTokenFailed?: boolean;
}

const initialState: MyServiceState = {
  myServiceResponse: undefined,
  myServiceLoadingError: undefined,
  myServiceLoading: false,
  currentMyService: undefined,
  currentMyServiceLoadingError: undefined,
  currentMyServiceLoading: false,
  cartLine_id: undefined,
  generateTokenLoading: undefined,
  generatedToken: undefined,
  generateTokenFailed: undefined,
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
        state.myServiceResponse = payload;
      })
      .addCase(fetchMyServices.rejected, (state, { payload }) => {
        state.myServiceLoading = false;
        state.myServiceLoadingError = payload;
      })
      .addCase(fetchMyServiceById.pending, (state) => {
        state.currentMyServiceLoading = true;
        state.currentMyServiceLoadingError = null;
      })
      .addCase(fetchMyServiceById.fulfilled, (state, action) => {
        state.currentMyServiceLoading = false;
        state.currentMyServiceLoadingError = null;
        state.currentMyService = { ...action.payload.result, ...{ id: action.payload.id } };
        state.cartLine_id = action.payload.id;
      })
      .addCase(fetchMyServiceById.rejected, (state, { payload }) => {
        state.currentMyServiceLoading = false;
        state.currentMyServiceLoadingError = payload;
      })   //GENRATE API TOKEN 
      .addCase(generateTokenThunk.pending, (state) => {
        state.generateTokenLoading = true;
        state.generatedToken = undefined;
      })
      .addCase(generateTokenThunk.fulfilled, (state, action) => {
        state.generateTokenLoading = false;
        state.generatedToken = action.payload;
      })
      .addCase(generateTokenThunk.rejected, (state) => {
        state.generateTokenLoading = false;
        state.generateTokenFailed = true;
      });
  },
});
export default MyServiceSlice.reducer;
