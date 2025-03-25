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
        return response.data;
      } else {
        return thunkConfig.rejectWithValue("Failed to fetch profiles liste");
      }
    } catch (error: any) {
      return thunkConfig.rejectWithValue(error.message);
    }
  },
);

export const getProfileById = createAsyncThunk(
  "apiServices/getProfileById",
  async (profile_id: string, thunkConfig) => {
      try {
          const session = await getSession();
          if (!session) {
              return thunkConfig.rejectWithValue("session expired");
          }
          const token = session.accessToken;

          const response = await axios.get(`${deploilyApiUrls.PROFILE_URL}${profile_id}`, {
              headers: {
                  Accept: "application/json",
                  Authorization: `Bearer ${token}`,
              },
          });
          if (response.status === 200) {
              return response.data;
          } else {
              return thunkConfig.rejectWithValue("Failed to get profile");
          }
      } catch (error: any) {
          return thunkConfig.rejectWithValue(error.response.data.message);
      }
  },
);


  

