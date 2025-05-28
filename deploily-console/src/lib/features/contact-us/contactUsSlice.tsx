import { createSlice } from "@reduxjs/toolkit";
import { ContactUsResponse } from "./contactUsInterface";
import { postFeedBack } from "./contactUsThunks";

interface ContactUsState {
  contactUsResponse?: ContactUsResponse;
  isLoading: boolean;
  isError?: any;
}

const initialState: ContactUsState = {
  contactUsResponse: undefined,
  isLoading: false,
  isError: false,

};
const ContactUsSlice = createSlice({
  name: "contactUs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postFeedBack.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
        state.contactUsResponse = undefined;
      })
      .addCase(postFeedBack.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.contactUsResponse = action.payload;

      })
      .addCase(postFeedBack.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = payload;
        state.contactUsResponse = undefined;
      })
  },
});
export default ContactUsSlice.reducer;
