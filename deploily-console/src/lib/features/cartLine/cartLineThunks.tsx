import { deploilyApiUrls } from "@/deploilyWebsiteUrls";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCartLines = createAsyncThunk(
    "cartLine/getcartLines",
    async (_, thunkConfig) => {
        try {
            const response = await axios.get(`${deploilyApiUrls.CART_LINE_URL}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNzQwMDUwNDAyLCJqdGkiOiI5YmY0MTMyNS1jZjQwLTQ2N2EtODMxNS1mODhkMjlhZmQwNTEiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoxLCJuYmYiOjE3NDAwNTA0MDIsImNzcmYiOiI3NTExZDY0YS1mZmNhLTRhNWMtYjMyZS02MDFhMzAwYzBiYWYiLCJleHAiOjE3NDAxMzY4MDJ9.YFQL7HQZn1B_-vRz0WczadwHhiZozVNP9F-qYRZTCK4`,
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
            const response = await axios.get(`${deploilyApiUrls.CART_LINE_URL}${cartLine_id}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNzQwMDUwNDAyLCJqdGkiOiI5YmY0MTMyNS1jZjQwLTQ2N2EtODMxNS1mODhkMjlhZmQwNTEiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoxLCJuYmYiOjE3NDAwNTA0MDIsImNzcmYiOiI3NTExZDY0YS1mZmNhLTRhNWMtYjMyZS02MDFhMzAwYzBiYWYiLCJleHAiOjE3NDAxMzY4MDJ9.YFQL7HQZn1B_-vRz0WczadwHhiZozVNP9F-qYRZTCK4`,
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
