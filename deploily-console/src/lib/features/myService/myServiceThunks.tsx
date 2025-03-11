import { deploilyApiUrls } from "@/deploilyWebsiteUrls";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getSession } from "next-auth/react";

export const fetchMyServices = createAsyncThunk(
  "myServices/getMyServices",
  async (_, thunkConfig) => {
    try {
      const session = await getSession();

      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }
      const token = session.accessToken;

      const response = await axios.get(`${deploilyApiUrls.My_SERVICE_URL}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
     

      if (response.status === 200) {
        return response.data;
      }
      else {
        return thunkConfig.rejectWithValue("Failed to fetch my services");
      }

     
    } catch (error: any) {
      return thunkConfig.rejectWithValue(error.message);
    }
  },
);
export const fetchMyServiceById = createAsyncThunk(
  "myServices/getMyService",
  async (myService_id: string, thunkConfig) => {
      try {
          const session = await getSession();
          if (!session) {
              return thunkConfig.rejectWithValue("session expired");
          }
          const token = session.accessToken;

          const response = await axios.get(`${deploilyApiUrls.My_SERVICE_URL}${myService_id}`, {
              headers: {
                  Accept: "application/json",
                  Authorization: `Bearer ${token}`,
              },
          });
          if (response.status === 200) {
              return response.data;
          } else {
              return thunkConfig.rejectWithValue("Failed to fetch my service");
          }
      } catch (error: any) {
          return thunkConfig.rejectWithValue(error.response.data.message);
      }
  },
);

export const postMyService = createAsyncThunk(
  "myServices/postMyService",
  async (data: any, thunkConfig) => {
    console.log("postMyService=== ", data);
    
    try {
      const session = await getSession();
      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }
      const token = session.accessToken;

      const response = await axios.post(`${deploilyApiUrls.My_SERVICE_URL}`, data, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        return response.data;
      } else {
        return thunkConfig.rejectWithValue("Failed to create new my service");
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
          const response = await axios.post(`${deploilyApiUrls.My_SERVICE_URL}${myService_id}/consumer`,{}, {
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

