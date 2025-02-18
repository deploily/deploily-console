import {deploilyApiUrls} from "@/deploilyWebsiteUrls";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchApiServices = createAsyncThunk(
  "apiServices/getapiServices",
  async (_, thunkConfig) => {
    try {
      const response = await axios.get(`${deploilyApiUrls.SERVICE_URL}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNzM5ODczOTQyLCJqdGkiOiIxMWRjZmNjNC00ZWViLTRiZDUtOWI1YS1mY2FiODExY2E2ZmMiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoxLCJuYmYiOjE3Mzk4NzM5NDIsImNzcmYiOiIyZGE0MzAzMy1iNGJmLTQ5YmItYTBiNi03ZGU4NjJhOTIyN2YiLCJleHAiOjE3Mzk5NjAzNDJ9.6ifPJ3YEAZBMIvb-b4IfPTel3K07vL9slm8fbinq30k`,
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
  },
);
export const getApiServiceById = createAsyncThunk(
  "apiServices/getapiServiceById",
  async (service_id: string, thunkConfig) => {
    try {
      const response = await axios.get(`${deploilyApiUrls.SERVICE_URL}${service_id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNzM5ODczOTQyLCJqdGkiOiIxMWRjZmNjNC00ZWViLTRiZDUtOWI1YS1mY2FiODExY2E2ZmMiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoxLCJuYmYiOjE3Mzk4NzM5NDIsImNzcmYiOiIyZGE0MzAzMy1iNGJmLTQ5YmItYTBiNi03ZGU4NjJhOTIyN2YiLCJleHAiOjE3Mzk5NjAzNDJ9.6ifPJ3YEAZBMIvb-b4IfPTel3K07vL9slm8fbinq30k`,
        },
      });
      if (response.status == 200) {
        thunkConfig.dispatch(fetchApiServices());
        return response.data;
      } else {
        return thunkConfig.rejectWithValue("error");
      }
    } catch (error: any) {
      return thunkConfig.rejectWithValue(error.response.data.message);
    }
  },
);
