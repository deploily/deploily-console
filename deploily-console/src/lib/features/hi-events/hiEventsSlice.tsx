import {createSlice} from "@reduxjs/toolkit";
import {HiEventsAppByIdState} from "./hiEventsInterface";
import {fetchHiEventsAppById} from "./hiEventsThunks";

interface HiEventsAppState {
  hiEventsAppById: HiEventsAppByIdState;
}

const initialState: HiEventsAppState = {
  hiEventsAppById: {
    hiEventsAppById: undefined,
    isLoading: false,
    loadingError: null,
  },
};
const hiEventsAppSlice = createSlice({
  name: "hiEventsApp",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHiEventsAppById.pending, (state) => {
        state.hiEventsAppById.isLoading = true;
      })
      .addCase(fetchHiEventsAppById.fulfilled, (state, action) => {
        state.hiEventsAppById.isLoading = false;
        state.hiEventsAppById.loadingError = null;
        state.hiEventsAppById.hiEventsAppById = action.payload.result;
      })
      .addCase(fetchHiEventsAppById.rejected, (state, {payload}) => {
        state.hiEventsAppById.isLoading = false;
        state.hiEventsAppById.loadingError = payload;
      });
  },
});

export const {} = hiEventsAppSlice.actions;
export default hiEventsAppSlice.reducer;
