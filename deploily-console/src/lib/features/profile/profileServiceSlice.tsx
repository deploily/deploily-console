import { createSlice } from "@reduxjs/toolkit";
import { ProfileServicesResponse } from "./profileServiceInterface";
import { fetchProfilesServices } from "./profileServiceThunks";

interface ProfileServiceState {
  profileServicesList?: ProfileServicesResponse;
  isLoading: boolean;
  profileServicesLoadingError?: any;
}

const initialState: ProfileServiceState = {
  profileServicesList: undefined,
  isLoading: false,
  profileServicesLoadingError: undefined,
 
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
      
  },
});
export default ProfileServiceSlice.reducer;
