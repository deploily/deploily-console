import axiosInstance from "@/app/api/axios-instance";
import { deploilyApiUrls } from "@/deploilyWebsiteUrls";
import { createAsyncThunk } from "@reduxjs/toolkit";
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


      const response = await axiosInstance.get(`${deploilyApiUrls.CHECK_PROMO_CODE}?promo_code=${encodeURIComponent(data)}`, {
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
      return thunkConfig.rejectWithValue(error.error);
    }
  },
);
