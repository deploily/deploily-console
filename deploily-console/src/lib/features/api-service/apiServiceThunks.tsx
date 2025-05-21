import axiosInstance from "@/app/api/axios-instance";
import { deploilyApiUrls } from "@/deploilyWebsiteUrls";
import { RootState } from "@/lib/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSession } from "next-auth/react";
export const fetchApiServices = createAsyncThunk(
  "apiServices/getapiServices",
  async (limit: number, thunkConfig) => {
    const state = thunkConfig.getState() as RootState;
    const searchValue = state.apiService.searchValue?.trim();

    const filters = searchValue
      ? `(filters:!((col:name,opr:ct,value:'${searchValue}')),page_size:${limit})`
      : `(page_size:${limit})`;

    const query = `?q=${encodeURIComponent(filters)}`;

    try {
      const session = await getSession();

      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }

      const token = session.accessToken;

      const response = await axiosInstance.get(`${deploilyApiUrls.SERVICE_URL}${query}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        return response.data;
      } else {
        return thunkConfig.rejectWithValue("Failed to fetch services");
      }
    } catch (error: any) {
      return thunkConfig.rejectWithValue(error.message);
    }
  }
);

export const getApiServiceById = createAsyncThunk(
  "apiServices/getapiServiceById",
  async (service_id: string, thunkConfig) => {
    try {
      const session = await getSession();
      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }
      const token = session.accessToken;
      const response = await axiosInstance.get(`${deploilyApiUrls.SERVICE_URL}${service_id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status == 200) {
        thunkConfig.dispatch(fetchApiServices(10));
        return response.data;
      } else {
        return thunkConfig.rejectWithValue("error");
      }
    } catch (error: any) {
      return thunkConfig.rejectWithValue(error.response.data.message);
    }
  },
);
