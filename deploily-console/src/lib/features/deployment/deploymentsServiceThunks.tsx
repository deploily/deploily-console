import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSession } from "next-auth/react";
import { data } from "./data";
import { dataById } from "./dataById";
import { dataResponse } from "./dataResponse";

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

export const fetchDeploymentServiceBySlug = createAsyncThunk(
  "deploymentsService/getdeploymentsServiceById",
  async (slug: any, thunkConfig) => {
    try {
      //get by filter with slug
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


export const deploymentSubscribe = createAsyncThunk(
  "deploymentService/postDeploymentSubscription",
  async ({ data, service_slug }: { data: any, service_slug?: string }, thunkConfig) => {
    try {
      const session = await getSession();
      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }
      const token = session.accessToken;
      const response = dataResponse(data);

      // const response = await axiosInstance.post(`${getSubscribeToDeploymentUrl(service_slug)}`, data, {

      //   headers: {
      //     Accept: "application/json",
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
      if (response.status === 200) {
        return response.data;
      } else {
        return thunkConfig.rejectWithValue("Failed to create new Deployment subscription");
      }
    } catch (error: any) {
      return thunkConfig.rejectWithValue(error.message);
    }
  },
);