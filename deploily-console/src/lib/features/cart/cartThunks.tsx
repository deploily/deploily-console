import { deploilyApiUrls } from "@/deploilyWebsiteUrls";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getSession } from "next-auth/react";

export const postServiceInCart = createAsyncThunk(
    "cart/posrtServiceInCart",
    async (id: string, thunkConfig) => {

        try {
            const session = await getSession();
            if (!session) {
                return thunkConfig.rejectWithValue("session expired");
            }
            const token = session.accessToken;
            const response = await axios.post(`${deploilyApiUrls.CART_URL}`,
                {
                    "service_id": id,
                },
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
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