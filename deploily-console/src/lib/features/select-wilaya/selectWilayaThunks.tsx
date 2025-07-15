import { getApiKey } from "@/actions/getApiKey";
import axiosInstance from "@/app/api/axios-instance";
import { deploilyApiUrls } from "@/deploilyWebsiteUrls";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchWilayaFromPosition = createAsyncThunk(
  "selectWilaya/fetchWilayaFromPosition",
  async ({ lat, long }: { lat: number; long: number }, thunkConfig) => {
    const apiKey = await getApiKey()
    console.log("1_____________________________________________________________");
    console.log("Next public API key:", apiKey);
    console.log("1_____________________________________________________________");


    try {

      const response = await axiosInstance.get(`${deploilyApiUrls.GET_WILAYA__URL}lat=${lat}&long=${long}`, {
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
    console.log("2_____________________________________________________________");
    console.log("Next public API key:", apiKey);
    console.log("2_____________________________________________________________");

    try {
      const response = await axiosInstance.get(`${deploilyApiUrls.GET_COMMUNE_URL}lat=${lat}&long=${long}`, {
        headers: {
          accept: "application/json",
          apikey: apiKey, // Use your API key if not provided
        },
      }
      );
      console.log("Response data:", response.data);
      console.log("Response status:", response.status);

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