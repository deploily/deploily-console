import { createAsyncThunk } from "@reduxjs/toolkit";
import { data } from "../my-deployments/data";
import { getSession } from "next-auth/react";
import axiosInstance from "@/app/api/axios-instance";
import { deploilyApiUrls } from "@/deploilyWebsiteUrls";


export const fetchDockerById = createAsyncThunk(
    "docker/getDockerById",
    async (id: number, thunkConfig) => {
        try {
            const response = data; // mock
            if (response.status === 200) {
                // ✅ pick the first matching object
                const docker = response.data.result.find((item) => item.id === Number(id));                
                return docker; // returns a single object
            } else {
                return thunkConfig.rejectWithValue("error");
            }
        } catch (error: any) {
            return thunkConfig.rejectWithValue(error.message);
        }
    }
);

export const postDockerParameters = createAsyncThunk(
    "docker/postDockerParameters",
    async ({ parameters }: { parameters: Record<string, string> }, thunkConfig) => {
        try {
            const session = await getSession();
        
            if (!session) {
                return thunkConfig.rejectWithValue("session expired");
            }
        console.log("Posting Docker Parameters:::::::::::::::", parameters);
        
            const token = session.accessToken;
        
            const response = await axiosInstance.put(`${deploilyApiUrls.COSTUM_PARAMETER_URL}/`, parameters, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
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