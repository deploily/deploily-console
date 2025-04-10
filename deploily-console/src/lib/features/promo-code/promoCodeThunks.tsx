import { deploilyApiUrls } from "@/deploilyWebsiteUrls";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getSession } from "next-auth/react";

export const checkPromoCode = createAsyncThunk(
  "promoCode/checkPromoCode",
  async (data: any, thunkConfig) => {
    try {
      const session = await getSession();

      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }
      const token = session.accessToken;


      const response = await axios.post(`${deploilyApiUrls.CHECK_PROMO_CODE}`, data, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });


      if (response.status === 200) {
        
        return response.data;
      }
      else {
        return thunkConfig.rejectWithValue("Failed to check promo code");
      }


    } catch (error: any) {
      return thunkConfig.rejectWithValue(error.message);
    }
  },
);
