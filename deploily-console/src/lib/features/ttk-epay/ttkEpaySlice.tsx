import { createSlice } from "@reduxjs/toolkit";
import { TtkEpayByIdState, UpdateTtkEpayState, UpgradeTtkEpayState } from "./ttkEpayInterface";
import { fetchTtkEpayById, updateTtkEpay, upgradeTtkEpay } from "./ttkEpayThunks";

interface TtkEpayState {
  ttkEpayById: TtkEpayByIdState;
  updateTtkEpay: UpdateTtkEpayState;
  upgradeTtkEpay: UpgradeTtkEpayState;
}

const initialState: TtkEpayState = {

  ttkEpayById: {
    ttkEpayById: undefined,
    isLoading: false,
    loadingError: null,
  },
  updateTtkEpay: {
    updateTtkEpay: undefined,
    isLoadingUpdate: false,
    loadingError: null,
  },
  upgradeTtkEpay: {
    upgradeTtkEpay: undefined,
    isLoadingUpgrade: false,
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
      })

      .addCase(updateTtkEpay.pending, (state) => {
        state.updateTtkEpay.isLoadingUpdate = true;
      })
      .addCase(updateTtkEpay.fulfilled, (state, action) => {
        state.updateTtkEpay.isLoadingUpdate = false;
        state.updateTtkEpay.loadingError = null;
        state.updateTtkEpay.updateTtkEpay = action.payload;

      })
      .addCase(updateTtkEpay.rejected, (state, { payload }) => {
        state.updateTtkEpay.isLoadingUpdate = false;
        state.updateTtkEpay.loadingError = payload;
      })


      .addCase(upgradeTtkEpay.pending, (state) => {
        state.upgradeTtkEpay.isLoadingUpgrade = true;
      })
      .addCase(upgradeTtkEpay.fulfilled, (state, action) => {
        state.upgradeTtkEpay.isLoadingUpgrade = false;
        state.upgradeTtkEpay.loadingError = null;
        state.upgradeTtkEpay.upgradeTtkEpay = action.payload;

      })
      .addCase(upgradeTtkEpay.rejected, (state, { payload }) => {
        state.upgradeTtkEpay.isLoadingUpgrade = false;
        state.upgradeTtkEpay.loadingError = payload;
      });


  },
});


export default TtkEpaySlice.reducer;