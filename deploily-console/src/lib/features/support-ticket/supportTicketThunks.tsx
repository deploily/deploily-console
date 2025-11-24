import axiosInstance from "@/app/api/axios-instance";
import {deploilyApiUrls} from "@/deploilyWebsiteUrls";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {getSession} from "next-auth/react";

export const fetchSupportTicket = createAsyncThunk(
  "supportTicket/getSupportTicket",
  async (_, thunkConfig) => {
    try {
      const session = await getSession();
      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }
      const token = session.accessToken;

      const response = await axiosInstance.get(`${deploilyApiUrls.SUPPORT_TICKET_URL}`, {
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
  "supportTicket/postSupportTicket",
  async (newsupportTicket: any, thunkConfig) => {
    try {
      const session = await getSession();
      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }
      const token = session.accessToken;

      const response = await axiosInstance.post(
        `${deploilyApiUrls.SUPPORT_TICKET_URL}`,
        newsupportTicket,
        {
          headers: {
            Accept: "application/json",
            // "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 201) {
        return response.data;
      } else {
        return thunkConfig.rejectWithValue("Failed to create new support ticket");
      }
    } catch (error: any) {
      return thunkConfig.rejectWithValue(error.message);
    }
  },
);

export const fetchSupportTicketById = createAsyncThunk(
  "supportTicket/getSupportTicketById",
  async (support_ticket_id, thunkConfig) => {
    try {
      const session = await getSession();
      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }
      const token = session.accessToken;

      const response = await axiosInstance.get(
        `${deploilyApiUrls.SUPPORT_TICKET_URL}${support_ticket_id}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 200) {
        return response.data;
      } else {
        return thunkConfig.rejectWithValue("Failed to fetch support ticket by id");
      }
    } catch (error: any) {
      return thunkConfig.rejectWithValue(error.message);
    }
  },
);
