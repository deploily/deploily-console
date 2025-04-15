import {createSlice} from "@reduxjs/toolkit";
import { ContactUsResponse } from "./contactUsInterface";

interface ContactUsState {
  contactUsResponse?: ContactUsResponse;

}

const initialState: ContactUsState = {
  contactUsResponse: undefined,
  
};
const ContactUsSlice = createSlice({
  name: "contactUs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
   
  },
});
export default ContactUsSlice.reducer;
