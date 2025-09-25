import { getApiKey } from "@/actions/getApiKey";
import { getWilayaApiUrl } from "@/actions/getWilayaApiUrl";
import axiosInstance from "@/app/api/axios-instance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchWilayaFromPosition = createAsyncThunk(
  "selectWilaya/fetchWilayaFromPosition",
  async ({ lat, long }: { lat: number; long: number }, thunkConfig) => {
    const apiKey = await getApiKey()
    const wilayaApiUrl = await getWilayaApiUrl()
    try {

      // TODO move to server side component `/api/getWilaya`
      // call local /api/getWilaya endpoint
      const response = await axiosInstance.get(`${wilayaApiUrl.WILAYA_API_URL}getWilaya?lat=${lat}&long=${long}`, {
        headers: {
          accept: "application/json",
          apikey: apiKey, // Use your API key if not provided
        },
      }
      );

      if (response.status === 200) {
        return response.data.data.wilaya;
      }
      else {
        return thunkConfig.rejectWithValue("Wilaya not found");


      }
    } catch (error) {
      return thunkConfig.rejectWithValue(error);
    }
  }
);


export const fetchCommuneFromPosition = createAsyncThunk(
  "selectWilaya/fetchCommuneFromPosition",
  async ({ lat, long }: { lat: number; long: number }, thunkConfig) => {
    const apiKey = await getApiKey()
    const wilayaApiUrl = await getWilayaApiUrl()

    try {
      const response = await axiosInstance.get(`${wilayaApiUrl.WILAYA_API_URL}getCommune?lat=${lat}&long=${long}`, {
        headers: {
          accept: "application/json",
          apikey: apiKey, // Use your API key if not provided
        },
      }
      );
      if (response.status === 200) {
        return response.data.data.commune;
      }
      else {
        return thunkConfig.rejectWithValue("Failed to fetch commune");
      }
    } catch (error) {
      return thunkConfig.rejectWithValue(error);
    }
  }
);