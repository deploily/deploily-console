import axiosInstance from "@/app/api/axios-instance";
import { deploilyApiUrls } from "@/deploilyWebsiteUrls";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSession } from "next-auth/react";
import { getSubscribeToAppUrl } from "./getSubscribeToAppUrl";

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


export const applicationSubscribe = createAsyncThunk(
    "applicationService/postApplicationSubscription",
    async ({ data, app_slug }: { data: any, app_slug?: string }, thunkConfig) => {
        try {
            const session = await getSession();
            if (!session) {
                return thunkConfig.rejectWithValue("session expired");
            }
            const token = session.accessToken;

            const response = await axiosInstance.post(`${getSubscribeToAppUrl(app_slug)}`, data, {

                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                return response.data;
            } else {
                return thunkConfig.rejectWithValue("Failed to create new Application subscription");
            }
        } catch (error: any) {
            return thunkConfig.rejectWithValue(error.message);
        }
    },
);


