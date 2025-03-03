import { createSlice } from "@reduxjs/toolkit";
import { fetchMyFavoriteServices, postFavoriteService } from "./favoriteServiceThunks";
import { FavoriteServicesResponse } from "./favoriteServiceInterface";

interface FavoriteServiceState {
  favoriteServicesList?: FavoriteServicesResponse;
  isLoading: boolean;
  favoriteServicesLoadingError?: any;
  addFavoriteServiceLoading: boolean;
  addFavoriteServiceError: any;
}

const initialState: FavoriteServiceState = {
  favoriteServicesList: undefined,
  isLoading: false,
  favoriteServicesLoadingError: undefined,
  addFavoriteServiceLoading: false,
  addFavoriteServiceError: false,
};
const FavoriteServiceSlice = createSlice({
  name: "FavoriteService",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyFavoriteServices.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMyFavoriteServices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favoriteServicesLoadingError = null;
        const result = action.payload.ids.map((id: number, index: any) =>
          Object.assign({}, { id: id }, action.payload.result[index]),
        );
        const payload = Object.assign({}, action.payload, { result: result });
        state.favoriteServicesList = payload;
      })
      .addCase(fetchMyFavoriteServices.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.favoriteServicesLoadingError = payload;
      })
      .addCase(postFavoriteService.pending, (state) => {
        state.addFavoriteServiceLoading = true;
        state.addFavoriteServiceError = null;
      })
      .addCase(postFavoriteService.fulfilled, (state) => {
        state.addFavoriteServiceLoading = false;
        state.addFavoriteServiceError = null;
      })
      .addCase(postFavoriteService.rejected, (state, { payload }) => {
        state.addFavoriteServiceLoading = false;
        state.addFavoriteServiceError = payload;
      })
    // .addCase(postFavoriteService.pending, (state) => {
    //   state.addFavoriteServiceLoading = true;
    //   state.addFavoriteServiceError = null;
    // })
    // .addCase(postFavoriteService.fulfilled, (state) => {
    //   state.addFavoriteServiceLoading = false;
    //   state.addFavoriteServiceError = null;
    // })
    // .addCase(postFavoriteService.rejected, (state, {payload}) => {
    //   state.addFavoriteServiceLoading = false;
    //   state.addFavoriteServiceError = payload;
    // });
  },
});
export default FavoriteServiceSlice.reducer;
