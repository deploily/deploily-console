import { deploilyApiUrls } from "@/deploilyWebsiteUrls";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getSession } from "next-auth/react";

export const fetchProfilesServices = createAsyncThunk(
  "apiServices/getProfiles",
  async (_, thunkConfig) => {
    try {
      const session = await getSession();
      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }
      const token = session.accessToken;

      const response = await axios.get(`${deploilyApiUrls.PROFILE_URL}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        if (response.data.result != null&&response.data.result.length>0) {
          thunkConfig.dispatch({ type: "SubscriptionStates/updateSelectedProfile", payload: response.data.result[0]})
        }
        return response.data;
      } else {
        return thunkConfig.rejectWithValue("Failed to fetch profiles liste");
      }
    } catch (error: any) {
      return thunkConfig.rejectWithValue(error.message);
    }
  },
);




