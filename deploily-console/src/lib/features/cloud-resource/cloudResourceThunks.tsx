import axiosInstance from "@/app/api/axios-instance";
import { deploilyApiUrls } from "@/deploilyWebsiteUrls";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSession } from "next-auth/react";
// import { data } from "./data";

export const fetchCloudResources = createAsyncThunk(
    "cloudresources/getcloudresources",
    async (_, thunkConfig) => {

        try {
            const session = await getSession();
            if (!session) {
                return thunkConfig.rejectWithValue("session expired");
            }
            const token = session.accessToken;
            const response = await axiosInstance.get(`${deploilyApiUrls.SERVICE_RESSOURCE_PROVIDERS}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                console.log(response.data);

                return response.data;
            } else {
                return thunkConfig.rejectWithValue("Failed to fetch service ressource providers");
            }
        } catch (error: any) {
            return thunkConfig.rejectWithValue(error.message);
        }
    },
);