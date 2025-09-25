import { createAsyncThunk } from "@reduxjs/toolkit";
import { deploilyApiUrls } from "@/deploilyWebsiteUrls";
import axiosInstance from "@/app/api/axios-instance";
import { getSession } from "next-auth/react";


export const fetchMyDeployments = createAsyncThunk(
  "myDeployment/getMyDeployments",
  async (_, thunkConfig) => {
     try {
       const session = await getSession();
       if (!session) {
         return thunkConfig.rejectWithValue("session expired");
       }
       const token = session.accessToken;
 
       const response = await axiosInstance.get(`${deploilyApiUrls.DEPLOYMENT_SERVICE_SUBSCRIPTION_URL}`, {
         headers: {
           Accept: "application/json",
           Authorization: `Bearer ${token}`,
         },
       });       
       if (response.status === 200) {
         return response.data;
       } else {
         return thunkConfig.rejectWithValue("Failed to fetch my deployments ");
       }
     } catch (error: any) {
       return thunkConfig.rejectWithValue(error.message);
     }
   },
);