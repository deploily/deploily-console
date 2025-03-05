import { deploilyApiUrls } from "@/deploilyWebsiteUrls";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getSession } from "next-auth/react";

export const fetchCartLines = createAsyncThunk(
    "cartLine/getcartLines",
    async (_, thunkConfig) => {
        try {
            const session = await getSession();
            if (!session) {
                return thunkConfig.rejectWithValue("session expired");
            }
            const token = session.accessToken;
            const response = await axios.get(`${deploilyApiUrls.CART_LINE_URL}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                return response.data;
            } else {
                return thunkConfig.rejectWithValue("Failed to fetch cart");
            }
        } catch (error: any) {
            return thunkConfig.rejectWithValue(error.message);
        }
    },
);
export const fetchCartLineById = createAsyncThunk(
    "cartLine/getcartLine",
    async (cartLine_id: string, thunkConfig) => {
        try {
            const session = await getSession();
            if (!session) {
                return thunkConfig.rejectWithValue("session expired");
            }
            const token = session.accessToken;

            const response = await axios.get(`${deploilyApiUrls.CART_LINE_URL}${cartLine_id}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                return response.data;
            } else {
                return thunkConfig.rejectWithValue("Failed to fetch cart line");
            }
        } catch (error: any) {
            return thunkConfig.rejectWithValue(error.response.data.message);
        }
    },
);
export const generateTokenThunk = createAsyncThunk(
    "cartLine/generateToken",
    async (cartLine_id: string, thunkConfig) => {
        try {
            const session = await getSession();
            if (!session) {
                return thunkConfig.rejectWithValue("session expired");
            }
            const token = session.accessToken;
            const response = await axios.post(`${deploilyApiUrls.CART_LINE_URL}${cartLine_id}/consumer`,{}, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                return response.data['auth-key'];
            } else {
                return thunkConfig.rejectWithValue("Failed to generate token");
            }
        } catch (error: any) {
            return thunkConfig.rejectWithValue(error.response.data.message);
        }
    },
);