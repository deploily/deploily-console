import { createSlice } from "@reduxjs/toolkit";
import { MyDeploymentByIdState, MyDeploymentState } from "./myDeploymentInterface";
import { fetchMyDeploymentById, fetchMyDeployments } from "./myDeploymentThunks";

interface DeploymentServiceState {
  myDeployments: MyDeploymentState;
  myDeploymentById: MyDeploymentByIdState;
}

const initialState: DeploymentServiceState = {
  myDeployments: {
    MyDeploymentList: undefined,
    isLoading: false,
    loadingError: null,
  },
  myDeploymentById: {
    myDeploymentsById: undefined,
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

      .addCase(fetchMyDeploymentById.pending, (state) => {
        state.myDeploymentById.isLoading = true;
      })
      .addCase(fetchMyDeploymentById.fulfilled, (state, action) => {
        state.myDeploymentById.isLoading = false;
        state.myDeploymentById.loadingError = null;
        state.myDeploymentById.myDeploymentsById = action.payload.result;
      })
      .addCase(fetchMyDeploymentById.rejected, (state, { payload }) => {
        state.myDeploymentById.isLoading = false;
        state.myDeploymentById.loadingError = payload;
      })
   
  },
});


export const { } = DeploymentServiceSlice.actions;
export default DeploymentServiceSlice.reducer;