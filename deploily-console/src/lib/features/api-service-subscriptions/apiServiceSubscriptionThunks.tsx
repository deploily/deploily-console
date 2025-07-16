import axiosInstance from "@/app/api/axios-instance";
import { deploilyApiUrls } from "@/deploilyWebsiteUrls";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSession } from "next-auth/react";

export const fetchApiServiceSubscription = createAsyncThunk(
  "apiServiceSubscribe/getApiServiceSubscription",
  async (_, thunkConfig) => {
    try {
      const session = await getSession();

      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }
      const token = session.accessToken;

      const response = await axiosInstance.get(`${deploilyApiUrls.API_SERVICE_SUBSCRIBE_URL}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });


      if (response.status === 200) {
        return response.data;
      }
      else {
        return thunkConfig.rejectWithValue("Failed to fetch api service subscribes");
      }


    } catch (error: any) {
      return thunkConfig.rejectWithValue(error.message);
    }
  },
);
export const fetchApiServiceSubscriptionById = createAsyncThunk(
  "apiServiceSubscribe/getApiServiceSubscriptionById",
  async (myService_id: string, thunkConfig) => {
    try {
      const session = await getSession();
      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }
      const token = session.accessToken;

      const response = await axiosInstance.get(`${deploilyApiUrls.API_SERVICE_SUBSCRIBE_URL}${myService_id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        return response.data;
      } else {
        return thunkConfig.rejectWithValue("Failed to fetch api Service Subscribe by ID");
      }
    } catch (error: any) {
      return thunkConfig.rejectWithValue(error.response.data.message);
    }
  },
);

export const postApiServiceSubscription = createAsyncThunk(
  "apiServiceSubscribe/postApiServiceSubscription",
  async (data: any, thunkConfig) => {

    try {
      const session = await getSession();
      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }
      const token = session.accessToken;

      const response = await axiosInstance.post(`${deploilyApiUrls.API_SERVICE_SUBSCRIPTION}`, data, {

        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        return response.data;
      } else {
        return thunkConfig.rejectWithValue("Failed to create new api service subscription");
      }
    } catch (error: any) {
      return thunkConfig.rejectWithValue(error.message);
    }
  },
);

export const postUpgradeApiServiceSubscription = createAsyncThunk(
  "apiServiceSubscribe/postUpgradeApiServiceSubscription",
  async (data: any, thunkConfig) => {

    try {
      const session = await getSession();
      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }
      const token = session.accessToken;

      const response = await axiosInstance.post(`${deploilyApiUrls.API_SERVICE_SUBSCRIPTION_UPGRADE}`, data, {

        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        return response.data;
      } else {
        return thunkConfig.rejectWithValue("Failed to create upgrade api service subscription");
      }
    } catch (error: any) {
      return thunkConfig.rejectWithValue(error.message);
    }
  },
);

export const postRenewApiServiceSubscription = createAsyncThunk(
  "apiServiceSubscribe/postRenewApiServiceSubscription",
  async (data: any, thunkConfig) => {

    try {
      const session = await getSession();
      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }
      const token = session.accessToken;

      const response = await axiosInstance.post(`${deploilyApiUrls.API_SERVICE_SUBSCRIPTION_RENEW}`, data, {

        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        return response.data;
      } else {
        return thunkConfig.rejectWithValue("Failed to create renew api service subscription");
      }
    } catch (error: any) {
      return thunkConfig.rejectWithValue(error.message);
    }
  },
);

export const generateTokenThunk = createAsyncThunk(
  "apiServiceSubscribe/generateToken",
  async (apiServiceSubscription_id: string, thunkConfig) => {
    try {
      const session = await getSession();
      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }
      const token = session.accessToken;

      const response = await axiosInstance.post(`${deploilyApiUrls.API_SERVICE_SUBSCRIBE_URL}${apiServiceSubscription_id}/token`, {}, {
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

