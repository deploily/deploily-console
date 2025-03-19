import { deploilyApiUrls } from "@/deploilyWebsiteUrls";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getSession } from "next-auth/react";

export const fetchSubscribe = createAsyncThunk(
  "subscribe/getSubscribe",
  async (_, thunkConfig) => {
    try {
      const session = await getSession();

      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }
      const token = session.accessToken;

      const response = await axios.get(`${deploilyApiUrls.SUBSCRIBE_URL}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
     

      if (response.status === 200) {
        return response.data;
      }
      else {
        return thunkConfig.rejectWithValue("Failed to fetch subscribes");
      }

     
    } catch (error: any) {
      return thunkConfig.rejectWithValue(error.message);
    }
  },
);
export const fetchSubscribeById = createAsyncThunk(
  "subscribe/getSubscribeById",
  async (myService_id: string, thunkConfig) => {
      try {
          const session = await getSession();
          if (!session) {
              return thunkConfig.rejectWithValue("session expired");
          }
          const token = session.accessToken;

          const response = await axios.get(`${deploilyApiUrls.SUBSCRIBE_URL}${myService_id}`, {
              headers: {
                  Accept: "application/json",
                  Authorization: `Bearer ${token}`,
              },
          });
          if (response.status === 200) {
              return response.data;
          } else {
              return thunkConfig.rejectWithValue("Failed to fetch subscribe");
          }
      } catch (error: any) {
          return thunkConfig.rejectWithValue(error.response.data.message);
      }
  },
);

export const postSubscribe = createAsyncThunk(
  "subscribe/postSubscribe",
  async (data: any, thunkConfig) => {
    
    try {
      const session = await getSession();
      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }
      const token = session.accessToken;

      const response = await axios.post(`${deploilyApiUrls.SUBSCRIBE_URL}`, data, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        return response.data;
      } else {
        return thunkConfig.rejectWithValue("Failed to create new subscribe");
      }
    } catch (error: any) {
      return thunkConfig.rejectWithValue(error.message);
    }
  },
);

export const generateTokenThunk = createAsyncThunk(
  "myServices/generateToken",
  async (myService_id: string, thunkConfig) => {
      try {
          const session = await getSession();
          if (!session) {
              return thunkConfig.rejectWithValue("session expired");
          }
          const token = session.accessToken;
          const response = await axios.post(`${deploilyApiUrls.SUBSCRIBE_URL}${myService_id}/consumer`,{}, {
              headers: {
                  Accept: "application/json",
                  Authorization: `Bearer ${token}`,
              },
          });
          if (response.status === 200) {
              return response.data['auth-key'];
          } else {
              return thunkConfig.rejectWithValue("Failed to generate token");
          }
      } catch (error: any) {
          return thunkConfig.rejectWithValue(error.response.data.message);
      }
  },
);

