import { createAsyncThunk } from "@reduxjs/toolkit";
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