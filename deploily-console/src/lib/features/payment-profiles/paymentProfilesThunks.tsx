import axiosInstance from "@/app/api/axios-instance";
import { deploilyApiUrls } from "@/deploilyWebsiteUrls";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSession } from "next-auth/react";

export const fetchPaymentProfiles = createAsyncThunk(
  "paymentProfile/getPaymentProfiles",
  async (_, thunkConfig) => {
    try {
      const session = await getSession();
      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }
      const token = session.accessToken;

      const response = await axiosInstance.get(`${deploilyApiUrls.PAYMENT_PROFILE_URL}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        return response.data;
      } else {
        return thunkConfig.rejectWithValue("Failed to fetch payment profiles list");
      }
    } catch (error: any) {
      return thunkConfig.rejectWithValue(error.message);
    }
  },
);

export const getPaymentProfileById = createAsyncThunk(
  "paymentProfile/getPaymentProfileById",
  async (profile_id: string, thunkConfig) => {
    try {
      const session = await getSession();
      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }
      const token = session.accessToken;

      const response = await axiosInstance.get(`${deploilyApiUrls.PAYMENT_PROFILE_URL}${profile_id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        return response.data;
      } else {
        return thunkConfig.rejectWithValue("Failed to get payment profile");
      }
    } catch (error: any) {
      return thunkConfig.rejectWithValue(error.response.data.message);
    }
  },
);


export const postPaymentProfile = createAsyncThunk(
  "paymentProfile/postPaymentProfile",
  async (data: any, thunkConfig) => {

    try {
      const session = await getSession();
      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }
      const token = session.accessToken;

      const response = await axiosInstance.post(`${deploilyApiUrls.PAYMENT_PROFILE_URL}`, data, {

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
export const updatePaymentProfile = createAsyncThunk(
  "paymentProfile/updatePaymentProfile",
  async (data: any, thunkConfig) => {
    try {
      const session = await getSession();
      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }
      const token = session.accessToken;

      const response = await axiosInstance.put(`${deploilyApiUrls.PAYMENT_PROFILE_URL}${data.id}`, data, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        return response.data;
      } else {
        return thunkConfig.rejectWithValue("Failed to update payment profile");
      }
    } catch (error: any) {
      return thunkConfig.rejectWithValue(error.message);
    }
  },
);


export const postFundBalance = createAsyncThunk(
  "paymentProfile/postFundBalance",
  async (data: any, thunkConfig) => {

    try {
      const session = await getSession();
      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }
      const token = session.accessToken;

      const response = await axiosInstance.post(`${deploilyApiUrls.FUND_BALANCE}`, data, {

        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        return response.data;
      } else {
        return thunkConfig.rejectWithValue("Failed to add fund balance");
      }
    } catch (error: any) {
      return thunkConfig.rejectWithValue(error.message);
    }
  },
);



export const fetchNotDefaultPaymentProfiles = createAsyncThunk(
  "paymentProfile/getNotDefaultPaymentProfiles",
  async (_, thunkConfig) => {
    try {
      const session = await getSession();
      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }
      const token = session.accessToken;

      const filters = `(filters:!((col:is_default_profile,opr:eq,value:false)))`;

      const query = `?q=${encodeURIComponent(filters)}`;

      const response = await axiosInstance.get(`${deploilyApiUrls.PAYMENT_PROFILE_URL}${query}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        return response.data;
      } else {
        return thunkConfig.rejectWithValue("Failed to fetch payment profiles list");
      }
    } catch (error: any) {
      return thunkConfig.rejectWithValue(error.message);
    }
  },
);