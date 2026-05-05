import { createSlice } from "@reduxjs/toolkit";
import { WebApplicationByIdState, WebApplicationDataUpdatedState } from "./webApplicationInterface";
import { fetchWebApplicationById, UpdateWebApplicationdata } from "./webApplicationThunks";

interface WebApplicationServiceState {
  webApplicationById: WebApplicationByIdState;
  webApplicationDataUpdated: WebApplicationDataUpdatedState;
}

const initialState: WebApplicationServiceState = {
  webApplicationById: {
    webApplicationById: undefined,
    isLoading: false,
    loadingError: null,
  },
  webApplicationDataUpdated: {
    webApplicationUpdated: undefined,
    isLoading: false,
    loadingError: null,
  },
};

const WebApplicationServiceSlice = createSlice({
  name: "webApplicationService",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWebApplicationById.pending, (state) => {
        state.webApplicationById.isLoading = true;
      })
      .addCase(fetchWebApplicationById.fulfilled, (state, action) => {
        state.webApplicationById.isLoading = false;
        state.webApplicationById.loadingError = null;
        state.webApplicationById.webApplicationById = action.payload.result;
      })

      .addCase(fetchWebApplicationById.rejected, (state, { payload }) => {
        state.webApplicationById.isLoading = false;
        state.webApplicationById.loadingError = payload as string;
      })
      .addCase(UpdateWebApplicationdata.pending, (state) => {
        state.webApplicationDataUpdated.isLoading = true;
        state.webApplicationDataUpdated.loadingError = null;
        state.webApplicationDataUpdated.webApplicationUpdated = undefined;
      })
      .addCase(UpdateWebApplicationdata.fulfilled, (state, action) => {
        state.webApplicationDataUpdated.isLoading = false;
        state.webApplicationDataUpdated.loadingError = null;
        state.webApplicationDataUpdated.webApplicationUpdated = action.payload.result;
      })

      .addCase(UpdateWebApplicationdata.rejected, (state, { payload }) => {
        state.webApplicationDataUpdated.isLoading = false;
        state.webApplicationDataUpdated.loadingError = payload as string;
        state.webApplicationDataUpdated.webApplicationUpdated = undefined;
      });
  },
});

export default WebApplicationServiceSlice.reducer;
