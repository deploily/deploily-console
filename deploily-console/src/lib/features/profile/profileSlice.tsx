import {createSlice} from "@reduxjs/toolkit";
import {ProfileInterface} from "./profileInterface";
import {getProfile} from "./profileThunks";

interface ProfileState {
  currentProfileLoading?: boolean;
  currentProfileError?: any;
  currentProfile?: ProfileInterface;
}

const initialState: ProfileState = {
  currentProfileLoading: false,
  currentProfileError: undefined,
  currentProfile: undefined,
};
const ProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.currentProfileLoading = true;
        state.currentProfileError = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.currentProfileLoading = false;
        state.currentProfileError = null;
        state.currentProfile = {...action.payload.result, ...{id: action.payload.id}};
      })
      .addCase(getProfile.rejected, (state, {payload}) => {
        state.currentProfileLoading = false;
        state.currentProfileError = payload;
      });
  },
});
export default ProfileSlice.reducer;
