import { createSlice } from "@reduxjs/toolkit";
import { SupportTicketResponse } from "./supportTicketInterface";
import { fetchSupportTicket } from "./supportTicketThanks";

interface SupportTicketState {
  supportTicketList?: SupportTicketResponse;
  isLoading: boolean;
  supportTicketLoadingError?: any;
  
}

const initialState:  SupportTicketState = {
    supportTicketList: undefined,
  isLoading: false,
  supportTicketLoadingError: undefined,
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
          Object.assign({}, { id: id }, action.payload.result[index]),
        );
        const payload = Object.assign({}, action.payload, { result: result });
        state.supportTicketList = payload;
      })
      .addCase(fetchSupportTicket.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.supportTicketLoadingError = payload;
      })
      
    
  },
});
export default SupportTicketSlice.reducer;
