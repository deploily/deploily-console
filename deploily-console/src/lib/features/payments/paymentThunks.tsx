import { deploilyApiUrls } from "@/deploilyWebsiteUrls";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getSession } from "next-auth/react";


export const fetchPayments = createAsyncThunk(
  "payment/getPayments",
  async (_, thunkConfig) => {
    try {
      const session = await getSession();
      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }
      const token = session.accessToken;

      const response = await axios.get(`${deploilyApiUrls.PAYMENT}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        return response.data;
      } else {
        return thunkConfig.rejectWithValue("Failed to fetch payment list ");
      }
    } catch (error: any) {
      return thunkConfig.rejectWithValue(error.message);
    }
  },
);

export const deletePaymentById = createAsyncThunk(
  "payment/deletepayment",
  async (payment_id: string, thunkConfig) => {
    try {
      const session = await getSession();
      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }
      const token = session.accessToken;

      const response = await axios.delete(`${deploilyApiUrls.PAYMENT}${payment_id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        return true
      } else {
        return thunkConfig.rejectWithValue("Failed to delete payment ");
      }
    } catch (error: any) {
      return thunkConfig.rejectWithValue(error.message);
    }
  },
);
export const deletePayments = createAsyncThunk(
  "payment/deletepayments",
  async (_, thunkConfig) => {
    try {
      const session = await getSession();
      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }
      const token = session.accessToken;

      const response = await axios.delete(`${deploilyApiUrls.PAYMENT}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        return true
      } else {
        return thunkConfig.rejectWithValue("Failed to delete payment ");
      }
    } catch (error: any) {
      return thunkConfig.rejectWithValue(error.message);
    }
  },
);

export const fetchPaymentById = createAsyncThunk(
  "payment/getPaymentById",
  async (payment_id: string, thunkConfig) => {
    try {
      const session = await getSession();
      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }
      const token = session.accessToken;

      const response = await axios.get(`${deploilyApiUrls.PAYMENT}${payment_id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        return response.data;
      } else {
        return thunkConfig.rejectWithValue("Failed to fetch payment");
      }
    } catch (error: any) {
      return thunkConfig.rejectWithValue(error.response.data.message);
    }
  },
);

// This thunk is used to upload a payment receipt for payment of type "bank_transfer"
export const uploadPaymentReceipt = createAsyncThunk(
  "payment/uploadPaymentReceipt",
  async (receiptData: any, thunkConfig) => {
    try {
      const session = await getSession();
      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }
      const token = session.accessToken;

      const response = await axios.post(`${deploilyApiUrls.PAYMENT}${receiptData.payment_id}${deploilyApiUrls.PAYMENT_RECEIPT}`,
        {"receipt":receiptData.fileData},
        {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        }
      });
      if (response.status === 200) {
        return response.data;
      } else {
        return thunkConfig.rejectWithValue("Failed to fetch payment");
      }
    } catch (error: any) {
      return thunkConfig.rejectWithValue(error.response.data.message);
    }
  },
);