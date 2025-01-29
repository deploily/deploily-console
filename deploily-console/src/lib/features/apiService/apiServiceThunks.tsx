import {createAsyncThunk} from "@reduxjs/toolkit";
import {data} from "./data";

export const fetchApiServices = createAsyncThunk(
  "apiServices/getapiServices",
  async (_, thunkConfig) => {
    try {
      const response = data;
      console.log(data);

      if (response.status == 200) {
        console.log(response.data);

        return response.data;
      } else {
        return thunkConfig.rejectWithValue("error");
      }
    } catch (error: any) {
      return thunkConfig.rejectWithValue(error.message);
    }
  },
);
