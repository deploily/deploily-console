import { createSlice } from "@reduxjs/toolkit";
import { fetchMyApplicationById, fetchMyApplications } from "./myApplicationThunks";
import { MyApplicationByIdState, MyApplicationState } from "./myApplicationInterface";

interface ApplicationServiceState {
  myApplications: MyApplicationState;
  myApplicationById: MyApplicationByIdState;

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

};
const ApplicationServiceSlice = createSlice({
  name: "myApplicationService",
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

      .addCase(fetchMyApplicationById.pending, (state) => {
        state.myApplicationById.isLoading = true;
      })
      .addCase(fetchMyApplicationById.fulfilled, (state, action) => {
        state.myApplicationById.isLoading = false;
        state.myApplicationById.loadingError = null;
        state.myApplicationById.myApplicationsById = action.payload.result;
      })
      .addCase(fetchMyApplicationById.rejected, (state, { payload }) => {
        state.myApplicationById.isLoading = false;
        state.myApplicationById.loadingError = payload;
      });


  },
});


export default ApplicationServiceSlice.reducer;