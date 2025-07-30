import axiosInstance from "@/app/api/axios-instance";
import { deploilyApiUrls } from "@/deploilyWebsiteUrls";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSession } from "next-auth/react";
import { getRenewToMyAppUrl, getUpgradeToMyAppUrl } from "./getSubscribeToMyAppUrl";
import { log } from "console";


export const fetchMyApplications = createAsyncThunk(
  "myApplication/getmyApplications",
  async (_, thunkConfig) => {
    try {
      const session = await getSession();
      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }
      const token = session.accessToken;

      const response = await axiosInstance.get(`${deploilyApiUrls.APP_SERVICE_SUBSCRIPTION_URL}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        return response.data;
      } else {
        return thunkConfig.rejectWithValue("Failed to fetch my applications ");
      }
    } catch (error: any) {
      return thunkConfig.rejectWithValue(error.message);
    }
  },
);

export const fetchMyApplicationById = createAsyncThunk(
  "myApplication/getMyApplicationeById",
  async (my_app_id: string, thunkConfig) => {
    try {
      const session = await getSession();

      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }

      const token = session.accessToken;

      const response = await axiosInstance.get(`${deploilyApiUrls.APP_SERVICE_SUBSCRIPTION_URL}${my_app_id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        return response.data;
      } else {
        return thunkConfig.rejectWithValue("Failed to fetch my application by id");
      }
    } catch (error: any) {
      return thunkConfig.rejectWithValue(error.message);
    }
  },
);


export const upgradeMyApplication = createAsyncThunk(
  "myApplication/upgradeMyApplication",
  async ({ data, service_slug }: { data: any, service_slug?: string }, thunkConfig) => {
    try {
      const session = await getSession();

      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }
      console.log("Upgrade data:::::::::::::::::", data);
      console.log("Upgrade service_slug:::::::::::::::::", service_slug);

      const token = session.accessToken;

      const response = await axiosInstance.post(`${getUpgradeToMyAppUrl(service_slug)}`,
      data, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
console.log("Upgrade response:::::::::::::::::", response);

      if (response.status === 200) {
        return response.data;
      } else {
        return thunkConfig.rejectWithValue("Failed to upgrade my application");
      }
    } catch (error: any) {
      return thunkConfig.rejectWithValue(error.message);
    }
  },
);

export const renewMyApplication = createAsyncThunk(
"myApplication/renewMyApplication",
  async ({ data, service_slug }: { data: any, service_slug?: string }, thunkConfig) => {
    try {
      const session = await getSession();
      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }
      const token = session.accessToken;

      const response = await axiosInstance.post(`${getRenewToMyAppUrl(service_slug)}`,
        data,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        return response.data;
      } else {
        return thunkConfig.rejectWithValue("Failed to renew my application");
      }
    } catch (error: any) {
      return thunkConfig.rejectWithValue(error.message);
    }
  }
);




