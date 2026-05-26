import { createSlice } from "@reduxjs/toolkit";
import { MobileApplicationByIdState, MobileApplicationDataUpdatedState } from "./mobileApplicationInterface";
import { fetchMobileApplicationById, UpdateMobileApplicationdata } from "./mobileApplicationThunks";

interface MobileApplicationServiceState {
  mobileApplicationById: MobileApplicationByIdState;
  mobileApplicationDataUpdated: MobileApplicationDataUpdatedState;
}

const initialState: MobileApplicationServiceState = {
  mobileApplicationById: {
    mobileApplicationById: undefined,
    isLoading: false,
    loadingError: null,
  },
  mobileApplicationDataUpdated: {
    mobileApplicationUpdated: undefined,
    isLoading: false,
    loadingError: null,
  },
};

const MobileApplicationServiceSlice = createSlice({
  name: "mobileApplicationService",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMobileApplicationById.pending, (state) => {
        state.mobileApplicationById.isLoading = true;
      })
      .addCase(fetchMobileApplicationById.fulfilled, (state, action) => {
        state.mobileApplicationById.isLoading = false;
        state.mobileApplicationById.loadingError = null;
        state.mobileApplicationById.mobileApplicationById = action.payload.result;
      })

      .addCase(fetchMobileApplicationById.rejected, (state, { payload }) => {
        state.mobileApplicationById.isLoading = false;
        state.mobileApplicationById.loadingError = payload as string;
      })
      .addCase(UpdateMobileApplicationdata.pending, (state) => {
        state.mobileApplicationDataUpdated.isLoading = true;
        state.mobileApplicationDataUpdated.loadingError = null;
        state.mobileApplicationDataUpdated.mobileApplicationUpdated = undefined;
      })
      .addCase(UpdateMobileApplicationdata.fulfilled, (state, action) => {
        state.mobileApplicationDataUpdated.isLoading = false;
        state.mobileApplicationDataUpdated.loadingError = null;
        state.mobileApplicationDataUpdated.mobileApplicationUpdated = action.payload.result;
      })

      .addCase(UpdateMobileApplicationdata.rejected, (state, { payload }) => {
        state.mobileApplicationDataUpdated.isLoading = false;
        state.mobileApplicationDataUpdated.loadingError = payload as string;
        state.mobileApplicationDataUpdated.mobileApplicationUpdated = undefined;
      });
  },
});

export default MobileApplicationServiceSlice.reducer;
