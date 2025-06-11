import axiosInstance from "@/app/api/axios-instance";
import { deploilyApiUrls } from "@/deploilyWebsiteUrls";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSession } from "next-auth/react";

export const getProvidersList = createAsyncThunk(
    "provider/getProvidersList",
    async (_, thunkConfig) => {
        try {
            const session = await getSession();
            if (!session) {
                return thunkConfig.rejectWithValue("session expired");
            }
            const token = session.accessToken;
            const response = await axiosInstance.get(`${deploilyApiUrls.PROVIDER_URL}`, {
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
            return thunkConfig.rejectWithValue(error.response.data.message);
        }
    },
);

export const fetchCloudResourcesByProviderId = createAsyncThunk(
    "provider/getCloudResourcesByProviderId",
    async (provider_id: number, thunkConfig) => {
        // const state = thunkConfig.getState() as RootState;//TODO GET PROVIDER ID FROM STATE
        // const provider_id = state.cloudResource.providerId;
        const filters = `(filters:!((col:provider,opr:rel_o_m,value:'${provider_id}')))`;

        const query = `?q=${encodeURIComponent(filters)}`;

        try {
            const session = await getSession();
            if (!session) {
                return thunkConfig.rejectWithValue("session expired");
            }
            const token = session.accessToken;
            const response = await axiosInstance.get(`${deploilyApiUrls.SERVICE_RESSOURCE}${query}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                return response.data;
            } else {
                return thunkConfig.rejectWithValue("Failed to fetch service ressource providers");
            }
        } catch (error: any) {
            return thunkConfig.rejectWithValue(error.message);
        }
    },
);


export const fetchPlansByResourceId = createAsyncThunk(
    "provider/getPlansByResourceId",
    async (resource_id:      number, thunkConfig) => {
        // const state = thunkConfig.getState() as RootState;//TODO GET RESOURCE ID FROM STATE
        const filters = `(filters:!((col:service,opr:rel_o_m,value:'${resource_id}')))`;
        const query = `?q=${encodeURIComponent(filters)}`;
        try {
            const session = await getSession();
            if (!session) {
                return thunkConfig.rejectWithValue("session expired");
            }
            const token = session.accessToken;
            const response = await axiosInstance.get(`${deploilyApiUrls.SERVICE_PLAN_URL}/${query}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                return response.data;
            } else {
                return thunkConfig.rejectWithValue("Failed to fetch service ressource providers");
            }
        } catch (error: any) {
            return thunkConfig.rejectWithValue(error.message);
        }
    },
);



