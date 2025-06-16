import { createSlice } from "@reduxjs/toolkit";
import { fetchMyApplications } from "./myApplicationThunks";
import {  MyApplicationState } from "./myApplicationInterface";

interface ApplicationServiceState {
  myApplications: MyApplicationState;

}

const initialState: ApplicationServiceState = {
  myApplications: {
    MyApplicationList: undefined,
    isLoading: false,
    loadingError: null,
  },
  

};
const ApplicationServiceSlice = createSlice({
  name: "applicationService",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyApplications.pending, (state) => {
        state.myApplications.isLoading = true;
      })
      .addCase(fetchMyApplications.fulfilled, (state, action) => {
        state.myApplications.isLoading = false;
        state.myApplications.loadingError = null;
        const result = action.payload.ids.map((id: number, index: any) =>
          Object.assign({}, { id: id }, action.payload.result[index]),
        );
        const payload = Object.assign({}, action.payload, { result: result });
        state.myApplications.MyApplicationList = payload;
      })
      .addCase(fetchMyApplications.rejected, (state, { payload }) => {
        state.myApplications.isLoading = false;
        state.myApplications.loadingError = payload;
      })
     
  },
});


export default ApplicationServiceSlice.reducer;