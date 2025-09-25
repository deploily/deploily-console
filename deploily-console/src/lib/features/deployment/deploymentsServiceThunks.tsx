import axiosInstance from "@/app/api/axios-instance";
import { deploilyApiUrls } from "@/deploilyWebsiteUrls";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSession } from "next-auth/react";
import { getSubscribeToDeploymentUrl } from "./getSubscribeToDeploymentUrl";

export const fetchDeploymentServices = createAsyncThunk(
  "deploymentsServices/getdeploymentsServices",
  async (_, thunkConfig) => {
    try {
      const session = await getSession();

      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }

      const token = session.accessToken;

      const response = await axiosInstance.get(`${deploilyApiUrls.DEPLOYMENT_SERVICES_URL}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

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

// TODO replace by GetById
export const fetchDeploymentServiceBySlug = createAsyncThunk(
  "deploymentsService/getdeploymentsServiceById",
  async (slug: any, thunkConfig) => {
    try {
      const session = await getSession();

      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }

      const token = session.accessToken;

      const query = `?q=${encodeURIComponent(`(filters:!((col:service_slug,opr:eq,value:'${slug}')))`)}`;
      const response = await axiosInstance.get(`${deploilyApiUrls.DEPLOYMENT_SERVICES_URL}${query}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
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

      const response = await axiosInstance.post(`${getSubscribeToDeploymentUrl(service_slug)}`, data, {

        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });


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