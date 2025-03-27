import { createSlice } from "@reduxjs/toolkit";
import { ProfileServiceInterface, ProfileServicesResponse } from "./profileServiceInterface";
import { fetchProfilesServices, getProfileById } from "./profileServiceThunks";

interface ProfileServiceState {
  profileServicesList?: ProfileServicesResponse;
  isLoading: boolean;
  profileServicesLoadingError?: any;
  currentProfile?: ProfileServiceInterface;
  currentProfileLoading?: boolean;
  currentProfileError?: any;
}

const initialState: ProfileServiceState = {
  profileServicesList: undefined,
  isLoading: false,
  profileServicesLoadingError: undefined,
  currentProfile: undefined,
  currentProfileLoading: false,
  currentProfileError: undefined,

};
const ProfileServiceSlice = createSlice({
  name: "ProfileServiceSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfilesServices.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProfilesServices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profileServicesLoadingError = null;
        const result = action.payload.ids.map((id: number, index: any) =>
          Object.assign({}, { id: id }, action.payload.result[index]),
        );
        const payload = Object.assign({}, action.payload, { result: result });
        state.profileServicesList = payload;
      })
      .addCase(fetchProfilesServices.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.profileServicesLoadingError = payload;
      })
      .addCase(getProfileById.pending, (state) => {
        state.currentProfileLoading = true;
        state.currentProfileError = null;
      })
      .addCase(getProfileById.fulfilled, (state, action) => {
        state.currentProfileLoading = false;
        state.currentProfileError = null;
        state.currentProfile = { ...action.payload.result, ...{ id: action.payload.id } };

      })
      .addCase(getProfileById.rejected, (state, { payload }) => {
        state.currentProfileLoading = false;
        state.currentProfileError = payload;
      })

  },
});
export default ProfileServiceSlice.reducer;
