import { createSlice,  } from "@reduxjs/toolkit";
import { SupabaseAppByIdState } from "./supabaseInterface";
import { fetchSupabaseAppById } from "./supabaseThunks";

interface SupabaseAppState {
  supabaseAppById: SupabaseAppByIdState;
}

const initialState: SupabaseAppState = {

  supabaseAppById: {
    supabaseAppById: undefined,
    isLoading: false,
    loadingError: null,
  }
};
const supabaseAppSlice = createSlice({
  name: "supabaseApp",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSupabaseAppById.pending, (state) => {
        state.supabaseAppById.isLoading = true;
      })
      .addCase(fetchSupabaseAppById.fulfilled, (state, action) => {
        state.supabaseAppById.isLoading = false;
        state.supabaseAppById.loadingError = null;
        state.supabaseAppById.supabaseAppById = action.payload.result;
      })
      .addCase(fetchSupabaseAppById.rejected, (state, { payload }) => {
        state.supabaseAppById.isLoading = false;
        state.supabaseAppById.loadingError = payload;
      })

  },
});

export const {} = supabaseAppSlice.actions;
export default supabaseAppSlice.reducer;