import axiosInstance from "@/app/api/axios-instance";
import {deploilyApiUrls} from "@/deploilyWebsiteUrls";
import {RootState} from "@/lib/store";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {getSession} from "next-auth/react";
import {getSubscribeToAppUrl} from "./getSubscribeToAppUrl";
import {Filter} from "./applicationServiceInterface";

export const fetchApplicationServices = createAsyncThunk(
  "applicationService/getApplicationServices",
  async (filterParams: Filter, thunkConfig) => {
    try {
      const session = await getSession();

      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }

      const token = session.accessToken;

      // ===== Extract filter values =====
      const searchValue = filterParams.searchTerm;
      const filters: any[] = [];

      if (searchValue) {
        filters.push({
          col: "name",
          opr: "ct",
          value: searchValue,
        });
      }

      // ===== Build query object =====
      const queryObject: any = {
        filters,
        page_size: filterParams.page_size,
      };

      if (filterParams.page !== undefined) {
        queryObject.page = filterParams.page;
      }

      // ===== Construct encoded query =====
      const query = `?q=${encodeURIComponent(JSON.stringify(queryObject))}`;

      // ===== Make API request =====
      const response = await axiosInstance.get(`${deploilyApiUrls.APPP_SERVICES_URL}${query}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // ===== Handle response =====
      if (response.status === 200) {
        return response.data;
      } else {
        return thunkConfig.rejectWithValue("Failed to fetch application services");
      }
    } catch (error: any) {
      return thunkConfig.rejectWithValue(error.message);
    }
  },
);

export const fetchApplicationServiceById = createAsyncThunk(
  "applicationService/getApplicationServiceById",
  async (app_id: any, thunkConfig) => {
    try {
      const session = await getSession();

      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }

      const token = session.accessToken;

      const response = await axiosInstance.get(`${deploilyApiUrls.APPP_SERVICES_URL}${app_id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        return response.data;
      } else {
        return thunkConfig.rejectWithValue("Failed to fetch service by id");
      }
    } catch (error: any) {
      return thunkConfig.rejectWithValue(error.message);
    }
  },
);

export const applicationSubscribe = createAsyncThunk(
  "applicationService/postApplicationSubscription",
  async ({data, service_slug}: {data: any; service_slug?: string}, thunkConfig) => {
    try {
      const session = await getSession();
      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }
      const token = session.accessToken;

      const response = await axiosInstance.post(`${getSubscribeToAppUrl(service_slug)}`, data, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        return response.data;
      } else {
        return thunkConfig.rejectWithValue("Failed to create new Application subscription");
      }
    } catch (error: any) {
      return thunkConfig.rejectWithValue(error.message);
    }
  },
);
