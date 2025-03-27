import { deploilyApiUrls } from "@/deploilyWebsiteUrls";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getSession } from "next-auth/react";


export const fetchServicePlan = createAsyncThunk(
    "servicePlan/getServicePlan",
    async (service_id: string, thunkConfig) => {
      try {
        const session = await getSession();
        if (!session) {
          return thunkConfig.rejectWithValue("session expired");
        }
        const token = session.accessToken;
        // const query= `?q=(filters:!(col:service_id,opr:eq,value:${serviceId}))`
        const query = `?q=(filters:!((col:service,opr:rel_o_m,value:${service_id})))`;
                const response = await axios.get(`${deploilyApiUrls.SERVICE_PLAN_URL}/${query}`, {
          headers: {
            Accept: "application/json",
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

 