import { deploilyApiUrls } from "@/deploilyWebsiteUrls";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getSession } from "next-auth/react";


export const fetchSupportTicket = createAsyncThunk(
    "apiServices/getSupportTicket",
    async (_, thunkConfig) => {
      try {
        const session = await getSession();
        if (!session) {
          return thunkConfig.rejectWithValue("session expired");
        }
        const token = session.accessToken;
  
        const response = await axios.get(`${deploilyApiUrls.SUPPORT_TICKET_URL}`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          return response.data;
        } else {
          return thunkConfig.rejectWithValue("Failed to fetch support ticket ");
        }
      } catch (error: any) {
        return thunkConfig.rejectWithValue(error.message);
      }
    },
  );

  export const postSupportTicket = createAsyncThunk(
    "apiServices/postSupportTicket",
    async (newsupportTicket: any, thunkConfig) => {
      console.log("newsupportTicket=== ", newsupportTicket);
      
      try {
        const session = await getSession();
        if (!session) {
          return thunkConfig.rejectWithValue("session expired");
        }
        const token = session.accessToken;
  
        const response = await axios.post(`${deploilyApiUrls.SUPPORT_TICKET_URL}`, newsupportTicket, {
          headers: {
            Accept: "application/json",
            // "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          return response.data;
        } else {
          return thunkConfig.rejectWithValue("Failed to create new support ticket");
        }
      } catch (error: any) {
        return thunkConfig.rejectWithValue(error.message);
      }
    },
  );