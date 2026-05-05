import axiosInstance from "@/app/api/axios-instance";
import { deploilyApiUrls } from "@/deploilyWebsiteUrls";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSession } from "next-auth/react";

export const fetchWebApplicationById = createAsyncThunk(
  "webApplication/getWebApplicationById",
  async (id: number, thunkConfig) => {
    try {
      const session = await getSession();

      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }
      const token = session.accessToken;
      const response = await axiosInstance.get(
        `${deploilyApiUrls.DEPLOYMENT_WEB_APPLICATION_SUBSCRIPTION_URL}/${id}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 200) {
        return response.data;
      } else {
        return thunkConfig.rejectWithValue("Failed to fetch webApplication service by id");
      }
    } catch (error: any) {
      return thunkConfig.rejectWithValue(error.message);
    }
  },
);

export const postWebApplicationParameters = createAsyncThunk(
  "webApplication/postWebApplicationParameters",
  async (data: any, thunkConfig) => {
    try {
      const session = await getSession();

      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }

      const token = session.accessToken;

      const response = await axiosInstance.post(
        `${deploilyApiUrls.COSTUM_PARAMETER_URL}/`,
        data.data,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 201) {
        return response.data;
      } else {
        return thunkConfig.rejectWithValue("Failed to update webApplication parameters");
      }
    } catch (error: any) {
      return thunkConfig.rejectWithValue(error.message);
    }
  },
);




export const UpdateWebApplicationdata = createAsyncThunk(
  "webApplication/updateWebApplicationdata",
  async (data: any, thunkConfig) => {


    try {
      const session = await getSession();

      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }

      const token = session.accessToken;

      const response = await axiosInstance.put(`${deploilyApiUrls.DEPLOYMENT_WEB_APPLICATION_SUBSCRIPTION_URL}/${data.webApplicationById}`,
        data.webApplicationdataUpdated,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 200) {
        return response.data;
      } else {
        return thunkConfig.rejectWithValue("Failed to update webApplication parameters");
      }
    } catch (error: any) {
      return thunkConfig.rejectWithValue(error.message);
    }
  },
);

// export const deleteWebApplicationParameters = createAsyncThunk(
//     "webApplication/deleteWebApplicationParameters",
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
//                 return thunkConfig.rejectWithValue("Failed to delete webApplication parameters");
//             }
//         } catch (error: any) {
//             return thunkConfig.rejectWithValue(error.message);
//         }
//     }
// );
// export const deleteWebApplicationParameterById = createAsyncThunk(
//     "webApplication/deleteWebApplicationParameterById",
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
//                 return thunkConfig.rejectWithValue("Failed to delete webApplication parameter");
//             }
//         } catch (error: any) {
//             return thunkConfig.rejectWithValue(error.message);
//         }
//     }
// );
