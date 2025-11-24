import {createSlice} from "@reduxjs/toolkit";
import {CommuneInterface, WilayaInterface} from "./selectWilayaInterface";
import {fetchCommuneFromPosition, fetchWilayaFromPosition} from "./selectWilayaThunks";

interface WilayaState {
  wilaya?: WilayaInterface;
  commune?: CommuneInterface;
  isLoadingWilaya?: boolean;
  wilayaLoadingError?: any;
}

const initialState: WilayaState = {
  wilaya: undefined,
  isLoadingWilaya: false,
  wilayaLoadingError: undefined,
};
const WilayaSlice = createSlice({
  name: "wilaya",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWilayaFromPosition.pending, (state) => {
        state.isLoadingWilaya = true;
        state.wilayaLoadingError = null;
      })
      .addCase(fetchWilayaFromPosition.fulfilled, (state, action) => {
        state.isLoadingWilaya = false;
        state.wilaya = action.payload;
      })
      .addCase(fetchWilayaFromPosition.rejected, (state, action) => {
        state.isLoadingWilaya = false;
        state.wilayaLoadingError = action.payload;
      })
      .addCase(fetchCommuneFromPosition.pending, (state) => {
        state.isLoadingWilaya = true;
        state.wilayaLoadingError = null;
      })
      .addCase(fetchCommuneFromPosition.fulfilled, (state, action) => {
        state.isLoadingWilaya = false;
        state.commune = action.payload;
      })
      .addCase(fetchCommuneFromPosition.rejected, (state, action) => {
        state.isLoadingWilaya = false;
        state.wilayaLoadingError = action.payload;
      });
  },
});
export default WilayaSlice.reducer;
