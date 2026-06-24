import {createSlice} from "@reduxjs/toolkit";
import {
  MyApplicationByIdState,
  MyApplicationState,
} from "./myApplicationInterface";
import {
  fetchMyApplicationById,
  fetchMyApplications,
} from "./myApplicationThunks";

interface ApplicationServiceState {
  myApplications: MyApplicationState;
  myApplicationById: MyApplicationByIdState;
  openDrawer: boolean;
  servicePlan: any;
  vpsPlan: any;
}

const initialState: ApplicationServiceState = {
  myApplications: {
    MyApplicationList: undefined,
    isLoading: false,
    loadingError: null,
  },
  myApplicationById: {
    myApplicationsById: undefined,
    isLoading: false,
    loadingError: null,
  },
  openDrawer: false,
  servicePlan: null,
  vpsPlan: null,
};
const ApplicationServiceSlice = createSlice({
  name: "myApplicationService",
  initialState,
  reducers: {
    openDrawer: (state, action) => {
      state.openDrawer = true;
      state.servicePlan = action.payload.servicePlan;
      state.vpsPlan = action.payload.vpsPlan;
    },
    closeDrawer: (state) => {
      state.openDrawer = false;
      state.servicePlan = null;
      state.vpsPlan = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyApplications.pending, (state) => {
        state.myApplications.isLoading = true;
      })
      .addCase(fetchMyApplications.fulfilled, (state, action) => {
        state.myApplications.isLoading = false;
        state.myApplications.loadingError = null;
        state.myApplications.MyApplicationList = action.payload.result;
      })
      .addCase(fetchMyApplications.rejected, (state, {payload}) => {
        state.myApplications.isLoading = false;
        state.myApplications.loadingError = payload;
      })

      .addCase(fetchMyApplicationById.pending, (state) => {
        state.myApplicationById.isLoading = true;
      })
      .addCase(fetchMyApplicationById.fulfilled, (state, action) => {
        state.myApplicationById.isLoading = false;
        state.myApplicationById.loadingError = null;
        state.myApplicationById.myApplicationsById = action.payload.result;
      })
      .addCase(fetchMyApplicationById.rejected, (state, {payload}) => {
        state.myApplicationById.isLoading = false;
        state.myApplicationById.loadingError = payload;
      });
  },
});

export const { openDrawer, closeDrawer} =
  ApplicationServiceSlice.actions;
export default ApplicationServiceSlice.reducer;
