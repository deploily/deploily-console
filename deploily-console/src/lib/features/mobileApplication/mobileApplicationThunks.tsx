import axiosInstance from "@/app/api/axios-instance";
import { deploilyApiUrls } from "@/deploilyWebsiteUrls";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSession } from "next-auth/react";

export const fetchMobileApplicationById = createAsyncThunk(
  "mobileApplication/getMobileApplicationById",
  async (id: number, thunkConfig) => {
    try {
      const session = await getSession();

      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }
      const token = session.accessToken;
      const response = await axiosInstance.get(
        `${deploilyApiUrls.DEPLOYMENT_MOBILE_APPLICATION_SUBSCRIPTION_URL}/${id}`,
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
        return thunkConfig.rejectWithValue("Failed to fetch mobileApplication service by id");
      }
    } catch (error: any) {
      return thunkConfig.rejectWithValue(error.message);
    }
  },
);

export const postMobileApplicationParameters = createAsyncThunk(
  "mobileApplication/postMobileApplicationParameters",
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
        return thunkConfig.rejectWithValue("Failed to update mobileApplication parameters");
      }
    } catch (error: any) {
      return thunkConfig.rejectWithValue(error.message);
    }
  },
);




export const UpdateMobileApplicationdata = createAsyncThunk(
  "mobileApplication/updateMobileApplicationdata",
  async (data: any, thunkConfig) => {


    try {
      const session = await getSession();

      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }

      const token = session.accessToken;

      const response = await axiosInstance.put(`${deploilyApiUrls.DEPLOYMENT_MOBILE_APPLICATION_SUBSCRIPTION_URL}/${data.mobileApplicationById}`,
        data.mobileApplicationdataUpdated,
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
        return thunkConfig.rejectWithValue("Failed to update mobileApplication parameters");
      }
    } catch (error: any) {
      return thunkConfig.rejectWithValue(error.message);
    }
  },
);

// export const deleteMobileApplicationParameters = createAsyncThunk(
//     "mobileApplication/deleteMobileApplicationParameters",
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
//                 return thunkConfig.rejectWithValue("Failed to delete mobileApplication parameters");
//             }
//         } catch (error: any) {
//             return thunkConfig.rejectWithValue(error.message);
//         }
//     }
// );
// export const deleteMobileApplicationParameterById = createAsyncThunk(
//     "mobileApplication/deleteMobileApplicationParameterById",
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
//                 return thunkConfig.rejectWithValue("Failed to delete mobileApplication parameter");
//             }
//         } catch (error: any) {
//             return thunkConfig.rejectWithValue(error.message);
//         }
//     }
// );
