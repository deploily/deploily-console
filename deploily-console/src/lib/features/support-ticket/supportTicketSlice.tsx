import { createSlice } from "@reduxjs/toolkit";
import { SupportTicket, SupportTicketResponse } from "./supportTicketInterface";
import { fetchSupportTicket, fetchSupportTicketById, postSupportTicket } from "./supportTicketThunks";

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
  currentSupportTicket?: SupportTicket;
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
      // FETCH SUPPORT TICKET BY ID
      .addCase(fetchSupportTicketById.pending, (state) => {
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
      });

  },
});
export default SupportTicketSlice.reducer;
