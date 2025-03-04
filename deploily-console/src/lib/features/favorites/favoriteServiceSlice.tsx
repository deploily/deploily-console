import { createSlice } from "@reduxjs/toolkit";
import { deleteFavoriteService, fetchMyFavoriteServices, postFavoriteService } from "./favoriteServiceThunks";
import { FavoriteServicesResponse } from "./favoriteServiceInterface";

interface FavoriteServiceState {
  favoriteServicesList?: FavoriteServicesResponse;
  isLoading: boolean;
  favoriteServicesLoadingError?: any;
  addFavoriteServiceLoading: boolean;
  deleteFavoriteServiceLoading: boolean;
  addFavoriteServiceError: any;
  deleteFavoriteServiceError: any;
  favoriteServiceAdded?: boolean;
  favoriteServiceDeleted?: boolean;
}

const initialState: FavoriteServiceState = {
  favoriteServicesList: undefined,
  isLoading: false,
  favoriteServicesLoadingError: undefined,
  addFavoriteServiceLoading: false,
  deleteFavoriteServiceLoading: false,
  addFavoriteServiceError: false,
  favoriteServiceAdded: undefined,
  deleteFavoriteServiceError: false,
  favoriteServiceDeleted: undefined,
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
        state.favoriteServiceAdded = false;
      })
      .addCase(postFavoriteService.fulfilled, (state) => {
        state.addFavoriteServiceLoading = false;
        state.addFavoriteServiceError = null;
        state.favoriteServiceAdded = true;
      })
      .addCase(postFavoriteService.rejected, (state, { payload }) => {
        state.addFavoriteServiceLoading = false;
        state.addFavoriteServiceError = payload;
        state.favoriteServiceAdded = false;
      })
      .addCase(deleteFavoriteService.pending, (state) => {
        state.deleteFavoriteServiceLoading = true;
        state.favoriteServiceDeleted = false;
        state.deleteFavoriteServiceError = null;
      })
      .addCase(deleteFavoriteService.fulfilled, (state) => {
        state.deleteFavoriteServiceLoading = false;
        state.favoriteServiceDeleted = true;
        state.deleteFavoriteServiceError = null;
      })
      .addCase(deleteFavoriteService.rejected, (state, { payload }) => {
        state.deleteFavoriteServiceLoading = false;
        state.favoriteServiceDeleted = false;
        state.deleteFavoriteServiceError = payload;
      });
  },
});
export default FavoriteServiceSlice.reducer;
