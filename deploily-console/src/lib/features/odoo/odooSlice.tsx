import {createSlice} from "@reduxjs/toolkit";
import {fetchOdooAppById} from "./odooThunks";
import {OdooAppByIdState} from "./odooInterface";

interface OdooAppState {
  odooAppById: OdooAppByIdState;
}

const initialState: OdooAppState = {
  odooAppById: {
    odooAppById: undefined,
    isLoading: false,
    loadingError: null,
  },
};
const odooAppSlice = createSlice({
  name: "odooApp",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOdooAppById.pending, (state) => {
        state.odooAppById.isLoading = true;
      })
      .addCase(fetchOdooAppById.fulfilled, (state, action) => {
        state.odooAppById.isLoading = false;
        state.odooAppById.loadingError = null;
        state.odooAppById.odooAppById = action.payload.result;
      })
      .addCase(fetchOdooAppById.rejected, (state, {payload}) => {
        state.odooAppById.isLoading = false;
        state.odooAppById.loadingError = payload;
      });
  },
});

export const {} = odooAppSlice.actions;
export default odooAppSlice.reducer;
