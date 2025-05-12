import axiosInstance from "@/app/api/axios-instance";
import { deploilyApiUrls } from "@/deploilyWebsiteUrls";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSession } from "next-auth/react";

export const checkEpaymentStatus = createAsyncThunk(
  "payment/checkPaymentStatus",
  async (satim_order_id: string, thunkConfig) => {
    try {
      const session = await getSession();
      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }
      const token = session.accessToken;


      const response = await axiosInstance.get(`${deploilyApiUrls.EPAYMENT_STATUS}?order_id=${satim_order_id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        return response.data;
      } else {
        return thunkConfig.rejectWithValue("Failed to check payment status");
      }
    } catch (error: any) {
      return thunkConfig.rejectWithValue(error.response.data.message);
    }
  },
);
export const generatePdfReceipt = createAsyncThunk(
  "payment/generatePdfReceipt",
  async (order_id: string, thunkConfig) => {
    try {
      const session = await getSession();
      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }
      const token = session.accessToken;


      const response = await axiosInstance.get(
        `${deploilyApiUrls.GENERATE_PDF_RECEIPT}?order_id=${order_id}`,
        {
          headers: {
            Accept: "application/pdf",
            Authorization: `Bearer ${token}`,
          },
          responseType: 'blob',
        }
      );
      if (response.status === 200) {
        return response.data;
      } else {
        return thunkConfig.rejectWithValue("Failed to generate Pdf receipt");
      }
    } catch (error: any) {
      return thunkConfig.rejectWithValue(error.response.data.message);
    }
  },
);

interface SendPdfReceiptEmailArgs {
  order_id: string;
  email: string;
}

export const sendPdfReceiptEmail = createAsyncThunk(
  "payment/sendPdfReceiptEmail",
  async (data: SendPdfReceiptEmailArgs, thunkConfig) => {
    try {
      const session = await getSession();
      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }
      const token = session.accessToken;


      const response = await axiosInstance.get(
        `${deploilyApiUrls.GENERATE_PDF_RECEIPT}?order_id=${data.order_id}&email=${data.email}`,
        {
          headers: {
            Accept: "application/pdf",
            Authorization: `Bearer ${token}`,
          },
          responseType: 'blob',
        }
      );
      if (response.status === 200) {
        return response.data;
      } else {
        return thunkConfig.rejectWithValue("Failed to send email receipt");
      }
    } catch (error: any) {
      return thunkConfig.rejectWithValue(error.response.data.message);
    }
  },
);

