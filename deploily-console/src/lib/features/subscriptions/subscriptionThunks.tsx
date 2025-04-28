import axiosInstance from "@/app/api/axios-instance";
import { deploilyApiUrls } from "@/deploilyWebsiteUrls";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSession } from "next-auth/react";

export const fetchSubscription = createAsyncThunk(
  "subscribe/getSubscription",
  async (_, thunkConfig) => {
    try {
      const session = await getSession();

      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }
      const token = session.accessToken;

      const response = await axiosInstance.get(`${deploilyApiUrls.SUBSCRIBE_URL}`, {
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
export const fetchSubscriptionById = createAsyncThunk(
  "subscribe/getSubscriptionById",
  async (myService_id: string, thunkConfig) => {
      try {
          const session = await getSession();
          if (!session) {
              return thunkConfig.rejectWithValue("session expired");
          }
          const token = session.accessToken;

        const response = await axiosInstance.get(`${deploilyApiUrls.SUBSCRIBE_URL}${myService_id}`, {
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

export const postSubscription = createAsyncThunk(
  "subscribtion/postSubscription",
  async (data: any, thunkConfig) => {

    try {
      const session = await getSession();
      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }
      const token = session.accessToken;

      const response = await axiosInstance.post(`${deploilyApiUrls.SERVICE_SUBSCRIPTION}`, data, {

        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        return response.data;
      } else {
        return thunkConfig.rejectWithValue("Failed to create new subscription");
      }
    } catch (error: any) {
      return thunkConfig.rejectWithValue(error.message);
    }
  },
);

export const generateTokenThunk = createAsyncThunk(
  "subscribe/generateToken",
  async (subscription_id: string, thunkConfig) => {
      try {
          const session = await getSession();
          if (!session) {
              return thunkConfig.rejectWithValue("session expired");
          }
          const token = session.accessToken;
          
        const response = await axiosInstance.post(`${deploilyApiUrls.SUBSCRIBE_URL}${subscription_id}/token`, {}, {
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

