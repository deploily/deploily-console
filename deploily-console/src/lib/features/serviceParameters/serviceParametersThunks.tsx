import { deploilyApiUrls } from "@/deploilyWebsiteUrls";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getSession } from "next-auth/react";

export const fetchServiceParameters = createAsyncThunk(
  "apiServices/getServiceParameter",
  async (service_id:number, thunkConfig) => {
    try {
      const session = await getSession();
      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }
      const token = session.accessToken;
      const query = `?q=(filters:!((col:service,opr:rel_o_m,value:${service_id})))`;
      const response = await axios.get(`${deploilyApiUrls.SERVICE_PARAMETER_URL}${query}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        return response.data;
      } else {
        return thunkConfig.rejectWithValue("Failed to fetch Service Parameters");
      }
    } catch (error: any) {
      return thunkConfig.rejectWithValue(error.message);
    }
  },
);

