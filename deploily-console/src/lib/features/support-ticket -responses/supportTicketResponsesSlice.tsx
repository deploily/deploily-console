import {createSlice} from "@reduxjs/toolkit";
import {postSupportTicketResponse} from "./supportTicketResponsesThunks";

interface SupportTicketResponseState {
  supportTicketResponseLoadingError?: any;
  addSupportTicketResponseLoading: boolean;
  addSupportTicketResponseSuccess: any;
  addSupportTicketResponseError: any;
}

const initialState: SupportTicketResponseState = {
  supportTicketResponseLoadingError: undefined,
  addSupportTicketResponseLoading: false,
  addSupportTicketResponseSuccess: false,
  addSupportTicketResponseError: false,
};
const SupportTicketResponseSlice = createSlice({
  name: "supportTicketResponse",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postSupportTicketResponse.pending, (state) => {
        state.addSupportTicketResponseLoading = true;
        state.addSupportTicketResponseSuccess = null;
        state.addSupportTicketResponseError = null;
      })
      .addCase(postSupportTicketResponse.fulfilled, (state) => {
        state.addSupportTicketResponseLoading = false;
        state.addSupportTicketResponseSuccess = true;
        state.addSupportTicketResponseError = false;
      })
      .addCase(postSupportTicketResponse.rejected, (state, {payload}) => {
        state.addSupportTicketResponseLoading = false;
        state.addSupportTicketResponseSuccess = false;
        state.addSupportTicketResponseError = payload;
      });
  },
});
export default SupportTicketResponseSlice.reducer;
