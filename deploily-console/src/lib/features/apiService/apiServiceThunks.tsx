import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { deploilyApiUrls } from "@/deploilyWebsiteUrls";

export const fetchApiServices = createAsyncThunk(
  "apiServices/getapiServices",
  async (_, thunkConfig) => {
    try {
        const response = await axios.get(`${deploilyApiUrls.SERIVE_URL}`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNzM5NzE1ODMyLCJqdGkiOiI1YzQ4NGY2Mi0zYWIyLTQwMmEtYmRkMS0wMWRkZDBiZDBkM2UiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoxLCJuYmYiOjE3Mzk3MTU4MzIsImNzcmYiOiJjNDIwOTNmOS04MTU3LTRhMmQtOWZiYi0zMDFiMGFiYWY5MzMiLCJleHAiOjE3Mzk4MDIyMzJ9.h-3UrbjwHVwdDOoNwv33jxeB_xTSIyEbr9LpTmiNF7U`,
          },
        });
        if (response.status === 200) {
          return response.data;
        } else {
          return thunkConfig.rejectWithValue("Failed to fetch services");
        }
    } catch (error: any) {
      return thunkConfig.rejectWithValue(error.message);
    }
  }
);
