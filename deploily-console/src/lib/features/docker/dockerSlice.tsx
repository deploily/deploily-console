import { createSlice } from "@reduxjs/toolkit";
import { fetchDockerById } from "./dockerThunks";
import { DockerByIdState } from "./dockerInterface";

interface DockerServiceState {
    dockerById: DockerByIdState;
}

const initialState: DockerServiceState = {
    dockerById: {
        dockerById: undefined,
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

            .addCase(fetchDockerById.rejected, (state, { payload }) => {
                state.dockerById.isLoading = false;
                state.dockerById.loadingError = payload as string;
            });
    },
});

export default DockerServiceSlice.reducer;
