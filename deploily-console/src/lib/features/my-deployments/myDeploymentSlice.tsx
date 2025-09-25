import { createSlice } from "@reduxjs/toolkit";
import { MyDeploymentState } from "./myDeploymentInterface";
import { fetchMyDeployments } from "./myDeploymentThunks";

interface DeploymentServiceState {
  myDeployments: MyDeploymentState;
}

const initialState: DeploymentServiceState = {
  myDeployments: {
    MyDeploymentList: undefined,
    isLoading: false,
    loadingError: null,
  }
};
const DeploymentServiceSlice = createSlice({
  name: "myDeploymentService",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyDeployments.pending, (state) => {
        state.myDeployments.isLoading = true;
      })
      .addCase(fetchMyDeployments.fulfilled, (state, action) => {
        state.myDeployments.isLoading = false;
        state.myDeployments.loadingError = null;
        state.myDeployments.MyDeploymentList = action.payload.result;
      })
      .addCase(fetchMyDeployments.rejected, (state, { payload }) => {
        state.myDeployments.isLoading = false;
        state.myDeployments.loadingError = payload;
      })
  },
});


export const { } = DeploymentServiceSlice.actions;
export default DeploymentServiceSlice.reducer;