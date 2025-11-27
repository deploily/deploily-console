import axiosInstance from "@/app/api/axios-instance";
import {deploilyApiUrls} from "@/deploilyWebsiteUrls";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {getSession} from "next-auth/react";

export const fetchNextCloudAppById = createAsyncThunk(
  "nextCloudapp/getNextCloudAppById",
  async (id: string, thunkConfig) => {
    try {
      const session = await getSession();

      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }

      const token = session.accessToken;

      const response = await axiosInstance.get(
        `${deploilyApiUrls.NEXT_CLOUD_APP_SUBSCRIPTION_URL}/${id}`,
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
        return thunkConfig.rejectWithValue("Failed to fetch next cloud app by id");
      }
    } catch (error: any) {
      return thunkConfig.rejectWithValue(error.message);
    }
  },
);
