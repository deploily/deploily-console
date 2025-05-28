import axiosInstance from "@/app/api/axios-instance";
import { deploilyApiUrls } from "@/deploilyWebsiteUrls";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSession } from "next-auth/react";


export const postFeedBack = createAsyncThunk(
  "feedBack/postFeedBack",
  async (message: any, thunkConfig) => {

    try {
      const session = await getSession();
      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }
      const token = session.accessToken;
      const user = session.user;

      const data = {
        message,
        name: user.name,
        email: user.email,
      };
      const response = await axiosInstance.post(`${deploilyApiUrls.CONTACT_US}`, data, {
        timeout: 20000,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 201) {
        return response.data;
      } else {
        return thunkConfig.rejectWithValue("Failed to add payment profile");
      }
    } catch (error: any) {
      return thunkConfig.rejectWithValue(error.message);
    }
  },
);