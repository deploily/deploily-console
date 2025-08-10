import axiosInstance from "@/app/api/axios-instance";
import { deploilyApiUrls } from "@/deploilyWebsiteUrls";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSession } from "next-auth/react";
import { Filter } from "./cloudResourceInterface";
import { log } from "console";
export const fetchCloudResources = createAsyncThunk(
    "cloudresources/getcloudresources",
    async (filterParams: Filter, thunkConfig) => {
        const searchValue = filterParams.searchTerm;
        const providerFilterValue = filterParams.provider;
        const categoryFilterValue = filterParams.category;

        const filters: any[] = [];

        if (searchValue) {
            filters.push({ col: "name", opr: "ct", value: searchValue, });
        }

        if (providerFilterValue) {
            filters.push({
                col: "provider",
                opr: "rel_o_m",
                value: providerFilterValue,
            });
        }

        if (categoryFilterValue) {
            filters.push({
                col: "ressouce_category",
                opr: "rel_o_m",
                value: categoryFilterValue,
            });
        }

        const queryObject: any = {
            filters,
            page_size: filterParams.page_size,
        };

        if (filterParams.page) {
            queryObject.page = filterParams.page;
        }

        const query = `?q=${encodeURIComponent(JSON.stringify(queryObject))}`;

        try {
            const session = await getSession();
            if (!session) {
                return thunkConfig.rejectWithValue("session expired");
            }
            const token = session.accessToken;
            const response = await axiosInstance.get(`${deploilyApiUrls.SERVICE_RESSOURCE}${query}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                return response.data;
            } else {
                return thunkConfig.rejectWithValue("Failed to fetch service ressource providers");
            }
        } catch (error: any) {
            return thunkConfig.rejectWithValue(error.message);
        }
    }
);


export const getResourceById = createAsyncThunk(
    "cloudresources/getResourceById",
    async (resource_id: string, thunkConfig) => {
        try {
            const session = await getSession();
            if (!session) {
                return thunkConfig.rejectWithValue("session expired");
            }
            const token = session.accessToken;
            const response = await axiosInstance.get(`${deploilyApiUrls.SERVICE_RESSOURCE}${resource_id}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status == 200) {
                return response.data;
            } else {
                return thunkConfig.rejectWithValue("error");
            }
        } catch (error: any) {
            return thunkConfig.rejectWithValue(error.response.data.message);
        }
    },
);
export const getProvidersList = createAsyncThunk(
    "cloudresources/getProviders",
    async (_, thunkConfig) => {
        try {
            const session = await getSession();
            if (!session) {
                return thunkConfig.rejectWithValue("session expired");
            }
            const token = session.accessToken;
            const response = await axiosInstance.get(`${deploilyApiUrls.PROVIDER_URL}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status == 200) {
                return response.data;
            } else {
                return thunkConfig.rejectWithValue("error");
            }
        } catch (error: any) {
            return thunkConfig.rejectWithValue(error.response.data.message);
        }
    },
);


export const postAffiliation = createAsyncThunk(
    "affiliation/postAffiliation",
    async (data: any, thunkConfig) => {
        try {
            const session = await getSession();
            if (!session) {
                return thunkConfig.rejectWithValue("session expired");
            }
            const token = session.accessToken;

            const response = await axiosInstance.post(`${deploilyApiUrls.CREATE_AFFILIATION_URL}`, data, {

                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 201) {
                return response.data;
            } else {
                return thunkConfig.rejectWithValue("Failed to create new affiliation");
            }
        } catch (error: any) {
            return thunkConfig.rejectWithValue(error.message);
        }
    },
);

export const getMyResources = createAsyncThunk(
    "resources/getMyResources",
    async (_, thunkConfig) => {
        try {
            const session = await getSession();
            if (!session) {
                return thunkConfig.rejectWithValue("session expired");
            }
            const token = session.accessToken;
            const response = await axiosInstance.get(`${deploilyApiUrls.AFFILIATION_URL}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                return response.data;
            } else {
                return thunkConfig.rejectWithValue("Failed to fetch my resources");
            }
        } catch (error: any) {
            return thunkConfig.rejectWithValue(error.message);
        }
    },
);
export const fetchResourceCategories = createAsyncThunk(
    "resourceCategories/fetchResourceCategories",
    async (_, thunkConfig) => {

        try {

            const response = await axiosInstance.get(

                `${deploilyApiUrls.RESOURCE_CATEGORY_URL}`,
                {

                }
            );
            if (response.status == 200) {
                return response.data;
            } else {
                return thunkConfig.rejectWithValue("error");
            }
        } catch (error: any) {
            return thunkConfig.rejectWithValue(error.message);
        }
    },
);


export const getManagedResources = createAsyncThunk(
    "resources/gemanagedResources",
    async (_, thunkConfig) => {
        try {
            const session = await getSession();
            if (!session) {
                return thunkConfig.rejectWithValue("session expired");
            }
            const token = session.accessToken;
            const response = await axiosInstance.get(`${deploilyApiUrls.MANAGED_RESSOURCE_URL}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("response", response);
            if (response.status === 200) {
                return response.data;
            } else {
                return thunkConfig.rejectWithValue("Failed to fetch managed resource");
            }
        } catch (error: any) {
            return thunkConfig.rejectWithValue(error.message);
        }
    },
);