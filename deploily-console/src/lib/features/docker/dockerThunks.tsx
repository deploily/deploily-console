import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSession } from "next-auth/react";
import axiosInstance from "@/app/api/axios-instance";
import { deploilyApiUrls } from "@/deploilyWebsiteUrls";

export const fetchDockerById = createAsyncThunk(
    "docker/getDockerById",
    async (id: number, thunkConfig) => {
        try {
            const session = await getSession();

            if (!session) {
                return thunkConfig.rejectWithValue("session expired");
            }
            const token = session.accessToken;
            const response = await axiosInstance.get(`${deploilyApiUrls.DEPLOYMENT_DOCKER_SUBSCRIPTION_URL}/${id}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                return response.data;
            } else {
                return thunkConfig.rejectWithValue("Failed to fetch docker service by id");
            }
        } catch (error: any) {
            return thunkConfig.rejectWithValue(error.message);
        }
    },
);

export const postDockerParameters = createAsyncThunk(
    "docker/postDockerParameters",
    async ( data : any , thunkConfig) => {
        try {
            const session = await getSession();
        
            if (!session) {
                return thunkConfig.rejectWithValue("session expired");
            }
            console.log("Posting Docker Parameters:::::::::::::::", data);
        
            const token = session.accessToken;
        
            const response = await axiosInstance.put(`${deploilyApiUrls.COSTUM_PARAMETER_URL}/`, data.data, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 201) {
                return response.data;
            } else {
                return thunkConfig.rejectWithValue("Failed to update docker parameters");
            }
        } catch (error: any) {
            return thunkConfig.rejectWithValue(error.message);
        }
    }
);
// export const deleteDockerParameters = createAsyncThunk(
//     "docker/deleteDockerParameters",
//     async ({ id }: { id: number }, thunkConfig) => {
//         try {
//             const session = await getSession();
        
//             if (!session) {
//                 return thunkConfig.rejectWithValue("session expired");
//             }
        
//             const token = session.accessToken;
        
//             const response = await axiosInstance.delete(`${deploilyApiUrls.DOCKER_SUBSCRIPTION_URL}/${data.id}`, {
//                 headers: {
//                     Accept: "application/json",
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             if (response.status === 200) {
//                 return response.data;
//             } else {
//                 return thunkConfig.rejectWithValue("Failed to delete docker parameters");
//             }
//         } catch (error: any) {
//             return thunkConfig.rejectWithValue(error.message);
//         }
//     }
// );
// export const deleteDockerParameterById = createAsyncThunk(
//     "docker/deleteDockerParameterById",
//     async ({ id, paramId }: { id: any; paramId: number }, thunkConfig) => {
//         try {
//             const session = await getSession();
        
//             if (!session) {
//                 return thunkConfig.rejectWithValue("session expired");
//             }
        
//             const token = session.accessToken;
        
//             const response = await axiosInstance.delete(`${deploilyApiUrls.DOCKER_SUBSCRIPTION_URL}/${data.id}/parameters/${paramId}`, {
//                 headers: {
//                     Accept: "application/json",
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             if (response.status === 200) {
//                 return response.data;
//             } else {
//                 return thunkConfig.rejectWithValue("Failed to delete docker parameter");
//             }
//         } catch (error: any) {
//             return thunkConfig.rejectWithValue(error.message);
//         }
//     }
// );