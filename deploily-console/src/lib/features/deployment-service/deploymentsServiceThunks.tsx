import {createAsyncThunk} from "@reduxjs/toolkit";
import {data} from "./data";
import {dataById} from "./dataById";

export const fetchDeploymentServices = createAsyncThunk(
  "deploymentsServices/getdeploymentsServices",
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

export const fetchDeploymentServiceById = createAsyncThunk(
  "deploymentsService/getdeploymentsServiceById",
  async (_, thunkConfig) => {
    try {
      const response = dataById;
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
