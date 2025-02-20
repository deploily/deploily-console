import { deploilyApiUrls } from "@/deploilyWebsiteUrls";
import { RootState } from "@/lib/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const postServiceInCart = createAsyncThunk(
    "cart/posrtServiceInCart",
    async (id: string, thunkConfig) => {

        try {
            const response = await axios.post(`${deploilyApiUrls.CART_URL}`,
                {
                    "service_id": id,
                },
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNzQwMDUwNDAyLCJqdGkiOiI5YmY0MTMyNS1jZjQwLTQ2N2EtODMxNS1mODhkMjlhZmQwNTEiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoxLCJuYmYiOjE3NDAwNTA0MDIsImNzcmYiOiI3NTExZDY0YS1mZmNhLTRhNWMtYjMyZS02MDFhMzAwYzBiYWYiLCJleHAiOjE3NDAxMzY4MDJ9.YFQL7HQZn1B_-vRz0WczadwHhiZozVNP9F-qYRZTCK4`,
                    },
                });
            if (response.status == 200) {
                return response.data;
            }
            else {
                return thunkConfig.rejectWithValue(`${response}`);
            }
        } catch (error: any) {
            return thunkConfig.rejectWithValue(error.response.data);
        }
    },
);