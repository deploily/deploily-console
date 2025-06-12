import axiosInstance from "@/app/api/axios-instance";
import { deploilyApiUrls } from "@/deploilyWebsiteUrls";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSession } from "next-auth/react";

export const fetchApplicationServices = createAsyncThunk(
    "applicationService/getapplicationService",
    async (_, thunkConfig) => {

        try {
            const session = await getSession();

            if (!session) {
                return thunkConfig.rejectWithValue("session expired");
            }

            const token = session.accessToken;

            const response = await axiosInstance.get(`${deploilyApiUrls.APPP_SERVICES_URL}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
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

export const fetchApplicationServiceById = createAsyncThunk(
    "applicationService/getApplicationServiceById",
    async (app_id, thunkConfig) => {
        try {
            const session = await getSession();

            if (!session) {
                return thunkConfig.rejectWithValue("session expired");
            }

            const token = session.accessToken;

            const response = await axiosInstance.get(`${deploilyApiUrls.APPP_SERVICES_URL}${app_id}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                return response.data;
            } else {
                return thunkConfig.rejectWithValue("Failed to fetch service by id");
            }
        } catch (error: any) {
            return thunkConfig.rejectWithValue(error.message);
        }
    },
);