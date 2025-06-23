import { createSlice } from "@reduxjs/toolkit";
import { ttkEpayByIdState } from "./ttkEpayInterface";
import { fetchTtkEpayById } from "./ttkEpayThunks";

interface TtkEpayState {
  ttkEpayById: ttkEpayByIdState;
}

const initialState: TtkEpayState = {
  
  ttkEpayById: {
    ttkEpayById: undefined,
    isLoading: false,
    loadingError: null,
  },

};
const TtkEpaySlice = createSlice({
  name: "ttkEpay",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      

      .addCase(fetchTtkEpayById.pending, (state) => {
        state.ttkEpayById.isLoading = true;
      })
      .addCase(fetchTtkEpayById.fulfilled, (state, action) => {
        state.ttkEpayById.isLoading = false;
        state.ttkEpayById.loadingError = null;
        state.ttkEpayById.ttkEpayById = action.payload.result;
      })
      .addCase(fetchTtkEpayById.rejected, (state, { payload }) => {
        state.ttkEpayById.isLoading = false;
        state.ttkEpayById.loadingError = payload;
      });


  },
});


export default TtkEpaySlice.reducer;