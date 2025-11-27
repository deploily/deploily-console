import axiosInstance from "@/app/api/axios-instance";
import {deploilyApiUrls} from "@/deploilyWebsiteUrls";
import {RootState} from "@/lib/store";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {getSession} from "next-auth/react";
import {getRenewToMyAppUrl, getUpgradeToMyAppUrl} from "./getSubscribeToMyAppUrl";

export const fetchMyApplications = createAsyncThunk(
  "myApplication/getmyApplications",
  async (_, thunkConfig) => {
    try {
      const session = await getSession();
      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }
      const token = session.accessToken;

      const response = await axiosInstance.get(`${deploilyApiUrls.APP_SERVICE_SUBSCRIPTION_URL}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        return response.data;
      } else {
        return thunkConfig.rejectWithValue("Failed to fetch my applications ");
      }
    } catch (error: any) {
      console.log("==========================", error);

      return thunkConfig.rejectWithValue(error.message);
    }
  },
);

export const fetchMyApplicationById = createAsyncThunk(
  "myApplication/getMyApplicationeById",
  async (my_app_id: string, thunkConfig) => {
    try {
      const session = await getSession();

      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }

      const token = session.accessToken;

      const response = await axiosInstance.get(
        `${deploilyApiUrls.APP_SERVICE_SUBSCRIPTION_URL}${my_app_id}`,
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
        return thunkConfig.rejectWithValue("Failed to fetch my application by id");
      }
    } catch (error: any) {
      return thunkConfig.rejectWithValue(error.message);
    }
  },
);

export const upgradeMyApplication = createAsyncThunk(
  "myApplication/upgradeMyApplication",
  async (
    {
      payment_method,
      subscriptionOldId,
      service_slug,
    }: {payment_method: any; subscriptionOldId: any; service_slug?: string},
    thunkConfig,
  ) => {
    try {
      const {
        duration,
        promoCode,
        selectedProfile,
        app_service_plan,
        managed_ressource_details,
        selected_version,
      } = (thunkConfig.getState() as RootState).myApplication.upgradeRenewMyApplicationData;

      const session = await getSession();

      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }

      const token = session.accessToken;

      const data = {
        duration: Number.parseInt(`${duration}`),
        promo_code: promoCode,
        payment_method: payment_method,
        service_plan_selected_id: app_service_plan ? app_service_plan.id : undefined,
        ressource_service_plan_selected_id: managed_ressource_details
          ? managed_ressource_details.id
          : undefined,
        profile_id: selectedProfile ? selectedProfile.id : undefined,
        version_selected_id: selected_version?.id,
        old_subscription_id: subscriptionOldId,
      };

      const response = await axiosInstance.post(`${getUpgradeToMyAppUrl(service_slug)}`, data, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        return response.data;
      } else {
        return thunkConfig.rejectWithValue("Failed to upgrade my application");
      }
    } catch (error: any) {
      return thunkConfig.rejectWithValue(error.message);
    }
  },
);

export const renewMyApplication = createAsyncThunk(
  "myApplication/renewMyApplication",
  async (
    {
      payment_method,
      service_slug,
      subscriptionOldId,
    }: {payment_method: string; service_slug?: string; subscriptionOldId: any},
    thunkConfig,
  ) => {
    try {
      const {duration, promoCode, selectedProfile} = (thunkConfig.getState() as RootState)
        .myApplication.upgradeRenewMyApplicationData;
      const session = await getSession();
      if (!session) {
        return thunkConfig.rejectWithValue("session expired");
      }
      const token = session.accessToken;

      const data = {
        duration: Number.parseInt(`${duration}`),
        promo_code: promoCode,
        payment_method: payment_method,
        profile_id: selectedProfile ? selectedProfile.id : undefined,
        old_subscription_id: subscriptionOldId,
      };

      const response = await axiosInstance.post(`${getRenewToMyAppUrl(service_slug)}`, data, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        return response.data;
      } else {
        return thunkConfig.rejectWithValue("Failed to renew my application");
      }
    } catch (error: any) {
      return thunkConfig.rejectWithValue(error.message);
    }
  },
);
