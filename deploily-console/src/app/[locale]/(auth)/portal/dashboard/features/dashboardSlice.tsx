import { createSlice } from "@reduxjs/toolkit";
import { DashboardResponse } from "./dashboardInterface";
import { fetchDashboardData } from "./dashboardThunks";

interface DashboardState {
  dashboardResponse?: DashboardResponse;
  dashboardLoading: boolean;
  dashboardError: any;
}

const initialState: DashboardState = {
  dashboardResponse: undefined,
  dashboardLoading: false,
  dashboardError: undefined,
};
const DashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.dashboardLoading = true;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.dashboardLoading = false;
        state.dashboardError = null;
        state.dashboardResponse = action.payload;
      })
      .addCase(fetchDashboardData.rejected, (state, {payload}) => {
        state.dashboardLoading = false;
        state.dashboardError = payload;
      });
  },
});
export default DashboardSlice.reducer;
