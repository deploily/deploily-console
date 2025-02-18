import { deploilyApiUrls } from "@/deploilyWebsiteUrls";
import { RootState } from "@/lib/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const postServiceInCart = createAsyncThunk(
    "cart/posrtServiceInCart",
    async (_, thunkConfig) => {
        const state = thunkConfig.getState() as RootState;
        var service_id = state.cart?.service_id ?? 0;
        service_id = ((typeof service_id) === 'string') ? parseInt(`${service_id}`) : service_id;
        try {
            const response = await axios.post(`${deploilyApiUrls.CART_URL}`, JSON.stringify({
                "service_id": service_id,
            }), {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNzM5ODczOTQyLCJqdGkiOiIxMWRjZmNjNC00ZWViLTRiZDUtOWI1YS1mY2FiODExY2E2ZmMiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoxLCJuYmYiOjE3Mzk4NzM5NDIsImNzcmYiOiIyZGE0MzAzMy1iNGJmLTQ5YmItYTBiNi03ZGU4NjJhOTIyN2YiLCJleHAiOjE3Mzk5NjAzNDJ9.6ifPJ3YEAZBMIvb-b4IfPTel3K07vL9slm8fbinq30k`,
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