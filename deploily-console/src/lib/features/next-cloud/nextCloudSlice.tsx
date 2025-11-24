import {createSlice} from "@reduxjs/toolkit";
import {fetchNextCloudAppById} from "./nextCloudThunks";
import {NextCloudAppByIdState} from "./nextCloudInterface";

interface NextCloudAppState {
  nextCloudAppById: NextCloudAppByIdState;
}

const initialState: NextCloudAppState = {
  nextCloudAppById: {
    nextCloudAppById: undefined,
    isLoading: false,
    loadingError: null,
  },
};
const nextCloudAppSlice = createSlice({
  name: "nextCloudApp",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNextCloudAppById.pending, (state) => {
        state.nextCloudAppById.isLoading = true;
      })
      .addCase(fetchNextCloudAppById.fulfilled, (state, action) => {
        state.nextCloudAppById.isLoading = false;
        state.nextCloudAppById.loadingError = null;
        state.nextCloudAppById.nextCloudAppById = action.payload.result;
      })
      .addCase(fetchNextCloudAppById.rejected, (state, {payload}) => {
        state.nextCloudAppById.isLoading = false;
        state.nextCloudAppById.loadingError = payload;
      });
  },
});

export const {} = nextCloudAppSlice.actions;
export default nextCloudAppSlice.reducer;
