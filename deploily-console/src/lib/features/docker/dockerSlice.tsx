import {createSlice} from "@reduxjs/toolkit";
import {fetchDockerById, UpdateDockerdata} from "./dockerThunks";
import {DockerByIdState, DockerDataUpdatedState} from "./dockerInterface";

interface DockerServiceState {
  dockerById: DockerByIdState;
  dockerDataUpdated: DockerDataUpdatedState;
}

const initialState: DockerServiceState = {
  dockerById: {
    dockerById: undefined,
    isLoading: false,
    loadingError: null,
  },
  dockerDataUpdated: {
    dockerUpdated: undefined,
    isLoading: false,
    loadingError: null,
  },
};

const DockerServiceSlice = createSlice({
  name: "dockerService",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDockerById.pending, (state) => {
        state.dockerById.isLoading = true;
      })
      .addCase(fetchDockerById.fulfilled, (state, action) => {
        state.dockerById.isLoading = false;
        state.dockerById.loadingError = null;
        state.dockerById.dockerById = action.payload.result;
      })

      .addCase(fetchDockerById.rejected, (state, {payload}) => {
        state.dockerById.isLoading = false;
        state.dockerById.loadingError = payload as string;
      })
      .addCase(UpdateDockerdata.pending, (state) => {
        state.dockerDataUpdated.isLoading = true;
        state.dockerDataUpdated.loadingError = null;
        state.dockerDataUpdated.dockerUpdated = undefined;
      })
      .addCase(UpdateDockerdata.fulfilled, (state, action) => {
        state.dockerDataUpdated.isLoading = false;
        state.dockerDataUpdated.loadingError = null;
        state.dockerDataUpdated.dockerUpdated = action.payload.result;
      })

      .addCase(UpdateDockerdata.rejected, (state, {payload}) => {
        state.dockerDataUpdated.isLoading = false;
        state.dockerDataUpdated.loadingError = payload as string;
        state.dockerDataUpdated.dockerUpdated = undefined;
      });
  },
});

export default DockerServiceSlice.reducer;
