import axiosInstance from "@/app/api/axios-instance";
import { deploilyApiUrls } from "@/deploilyWebsiteUrls";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface PaginationParams {
    page: number;
    page_size: number;
    service_plan_type: string
}


export const fetchResourceServicesPlans = createAsyncThunk(
    "ressourcePlans/getResourceServicesPlans",
    async ({ serviceId, subscriptionCategory }: { serviceId: string; subscriptionCategory?: string }, thunkConfig) => {
        try {
            const response = await axiosInstance.get(`${deploilyApiUrls.RESOURCE_SERVICE_PLANS_URL}`, {

                params: {
                    app_service_id: serviceId,
                    subscription_category: subscriptionCategory

                },
                headers: {
                    Accept: "application/json",
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