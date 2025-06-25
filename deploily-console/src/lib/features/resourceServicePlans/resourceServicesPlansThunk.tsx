import axiosInstance from "@/app/api/axios-instance";
import { deploilyApiUrls } from "@/deploilyWebsiteUrls";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSession } from "next-auth/react";

export interface PaginationParams {
    page: number;
    page_size: number;
    service_plan_type: string
}

/**
 * Thunk to fetch paginated service plans from the backend API.
 *
 * @function fetchServicePlans
 * @param {PaginationParams} paginationParams - Contains pagination data (page number and size).
 * @param {ThunkAPI} thunkConfig - Thunk config with rejectWithValue utility.
 * @returns {Promise<any>} A promise that resolves with the fetched service plans data if successful,
 *                         or rejects with an error message if the request fails or session is expired.
 *
 * @throws {string} Will reject with a message if the session is missing or the API call fails.
 */
export const fetchServicePlansByType = createAsyncThunk(
    "ressourcePlans/getServicePlans",
    async (paginationParams: PaginationParams, thunkConfig) => {
        try {
            const session = await getSession();
            if (!session) {
                return thunkConfig.rejectWithValue("session expired");
            }
            const token = session.accessToken;
            const filters = `(filters:!((col:service_plan_type,opr:eq,value:'${paginationParams.service_plan_type}')),page:${paginationParams.page},page_size:${paginationParams.page_size})`;
            // const filters = `(page:${paginationParams.page},page_size:${paginationParams.page_size})`;

            const query = `?q=${encodeURIComponent(filters)}`;
            const response = await axiosInstance.get(`${deploilyApiUrls.SERVICE_PLAN_URL}/${query}`, {
                headers: {
                    Accept: "application/js on",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                return response.data;
            } else {
                return thunkConfig.rejectWithValue("Failed to fetch service plan");
            }
        } catch (error: any) {
            return thunkConfig.rejectWithValue(error.message);
        }
    },
);