import { createSlice } from "@reduxjs/toolkit";
import { SupportTicket, SupportTicketResponse } from "./supportTicketInterface";
import { fetchSupportTicket, fetchSupportTicketById, postSupportTicket, updateSupportTicketStatus, uploadSupportTicketImage } from "./supportTicketThunks";

interface SupportTicketState {
  supportTicketList?: SupportTicketResponse;
  isLoading: boolean;
  supportTicketLoadingError?: any;
  addSupportTicketLoading: boolean;
  addSupportTicketSuccess: any;
  addSupportTicketError: any;
  getSupportTicketLoading: any;
  getSupportTicketSuccess: any;
  getSupportTicketError: any;
  updateSupportTicketLoading: any;
  updateSupportTicketSuccess: any;
  updateSupportTicketError: any;
  currentSupportTicket?: SupportTicket;
  uploadImageLoading: boolean,
  uploadImageSuccess: boolean,
  uploadImageError: string | null,
}

const initialState: SupportTicketState = {
  supportTicketList: undefined,
  isLoading: false,
  supportTicketLoadingError: undefined,
  addSupportTicketLoading: false,
  addSupportTicketSuccess: false,
  addSupportTicketError: false,
  currentSupportTicket: undefined,
  getSupportTicketLoading: false,
  getSupportTicketSuccess: false,
  getSupportTicketError: false,
  uploadImageLoading: false,
  uploadImageError: null,
  uploadImageSuccess: false,
  updateSupportTicketLoading: false,
  updateSupportTicketSuccess: undefined,
  updateSupportTicketError: false,
};
const SupportTicketSlice = createSlice({
  name: "supportTicket",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSupportTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSupportTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.supportTicketLoadingError = null;
        const result = action.payload.ids.map((id: number, index: any) =>
          Object.assign({ key: index }, { id: id }, action.payload.result[index]),
        );
        const payload = Object.assign({}, action.payload, { result: result });
        state.supportTicketList = payload;
      })
      .addCase(fetchSupportTicket.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.supportTicketLoadingError = payload;
      })
      .addCase(postSupportTicket.pending, (state) => {
        state.addSupportTicketLoading = true;
        state.addSupportTicketSuccess = null;
        state.addSupportTicketError = null;
      })
      .addCase(postSupportTicket.fulfilled, (state) => {
        state.addSupportTicketLoading = false;
        state.addSupportTicketSuccess = true;
        state.addSupportTicketError = false;
      })
      .addCase(postSupportTicket.rejected, (state, { payload }) => {
        state.addSupportTicketLoading = false;
        state.addSupportTicketSuccess = false;
        state.addSupportTicketError = payload;
      })

      .addCase(updateSupportTicketStatus.pending, (state) => {
        state.updateSupportTicketLoading = true;
        state.updateSupportTicketSuccess = undefined;
      })
      .addCase(updateSupportTicketStatus.fulfilled, (state) => {
        state.updateSupportTicketLoading = false;
        state.updateSupportTicketSuccess = true;

      })
      .addCase(updateSupportTicketStatus.rejected, (state) => {
        state.updateSupportTicketLoading = false;
        state.updateSupportTicketError = true;
      })
      // FETCH SUPPORT TICKET BY ID
      .addCase(fetchSupportTicketById.pending, (state) => {
        state.updateSupportTicketSuccess = undefined;
        state.updateSupportTicketError = undefined;

        state.getSupportTicketLoading = true;
        state.getSupportTicketSuccess = null;
        state.getSupportTicketError = null;
      })
      .addCase(fetchSupportTicketById.fulfilled, (state, { payload }) => {
        state.getSupportTicketLoading = false;
        state.getSupportTicketSuccess = true;
        state.currentSupportTicket = { ...payload.result, ...{ id: payload.id } };
      })
      .addCase(fetchSupportTicketById.rejected, (state, { payload }) => {
        state.getSupportTicketLoading = false;
        state.getSupportTicketSuccess = false;
        state.getSupportTicketError = payload;
      })  // New uploadSupportTicketImage reducers
      .addCase(uploadSupportTicketImage.pending, (state) => {
        state.uploadImageLoading = true;
        state.uploadImageError = null;
        state.uploadImageSuccess = false;
      })
      .addCase(uploadSupportTicketImage.fulfilled, (state) => {
        state.uploadImageLoading = false;
        state.uploadImageSuccess = true;
        state.uploadImageError = null;
      })
      .addCase(uploadSupportTicketImage.rejected, (state, action) => {
        state.uploadImageLoading = false;
        state.uploadImageError = action.payload as string;
        state.uploadImageSuccess = false;
      });
  },
});
export default SupportTicketSlice.reducer;
