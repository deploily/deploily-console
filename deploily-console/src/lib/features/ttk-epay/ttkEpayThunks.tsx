import axiosInstance from "@/app/api/axios-instance";
import { deploilyApiUrls } from "@/deploilyWebsiteUrls";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSession } from "next-auth/react";


  export const fetchTtkEpayById = createAsyncThunk(
    "ttkEpay/getTtkEpayById",
    async (id: string, thunkConfig) => {
        try {
            const session = await getSession();

            if (!session) {
                return thunkConfig.rejectWithValue("session expired");
            }

            const token = session.accessToken;

            const response = await axiosInstance.get(`${deploilyApiUrls.TTK_EPAY_APP_SUBSCRIPTION_URL}/${id}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                return response.data;
            } else {
                return thunkConfig.rejectWithValue("Failed to fetch ttk-Epay by id");
            }
        } catch (error: any) {
            return thunkConfig.rejectWithValue(error.message);
        }
    },
);
export  const updateTtkEpay = createAsyncThunk(
    "ttkEpay/updateTtkEpay",
    async (data: any, thunkConfig) => {
        try {
            const session = await getSession();

            if (!session) {
                return thunkConfig.rejectWithValue("session expired");
            }

            const token = session.accessToken;

            const response = await axiosInstance.put(`${deploilyApiUrls.TTK_EPAY_APP_SUBSCRIPTION_URL}/${data.id}`, data.data, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                return response.data;
            } else {
                return thunkConfig.rejectWithValue("Failed to update ttk-Epay by id");
            }
        } catch (error: any) {
            return thunkConfig.rejectWithValue(error.message);
        }
    },
);

 
export  const upgradeTtkEpay = createAsyncThunk(
    "ttkEpay/upgradeTtkEpay",
    async (data: any, thunkConfig) => {
        try {
            const session = await getSession();

            if (!session) {
                return thunkConfig.rejectWithValue("session expired");
            }

            const token = session.accessToken;

            const response = await axiosInstance.post(`${deploilyApiUrls.TTK_EPAY_APP_SUBSCRIPTION_UPGRADE_URL}`, data.data, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                return response.data;
            } else {
                return thunkConfig.rejectWithValue("Failed to upgrade ttk-Epay");
            }
        } catch (error: any) {
            return thunkConfig.rejectWithValue(error.message);
        }
    },
);
export const renewTtkEpay = createAsyncThunk(
    "ttkEpay/renewTtkEpay",
    async (data: any, thunkConfig) => {
        try {
            const session = await getSession();
            if (!session) {
                return thunkConfig.rejectWithValue("session expired");
            }
            const token = session.accessToken;

            const response = await axiosInstance.post(
                `${deploilyApiUrls.TTK_EPAY_APP_SUBSCRIPTION_RENEW}`,
                data.data, 
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                return response.data;
            } else {
                return thunkConfig.rejectWithValue("Failed to renew ttk-Epay");
            }
        } catch (error: any) {
            return thunkConfig.rejectWithValue(error.message);
        }
    }
);




