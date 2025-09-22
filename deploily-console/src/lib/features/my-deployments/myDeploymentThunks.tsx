import axiosInstance from "@/app/api/axios-instance";
import { deploilyApiUrls } from "@/deploilyWebsiteUrls";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSession } from "next-auth/react";
import { data } from "./data";


export const fetchMyDeployments = createAsyncThunk(
  "myDeployment/getmyDeployments",
  async (_, thunkConfig) => {
    try {
      const response = data;

      if (response.status == 200) {

        return response.data;
      } else {
        return thunkConfig.rejectWithValue("error");
      }
    } catch (error: any) {
      return thunkConfig.rejectWithValue(error.message);
    }
  },
);

export const fetchMyDeploymentById = createAsyncThunk(
  "myDeployment/getMyDeploymenteById",
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



