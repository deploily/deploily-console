import {createSlice} from "@reduxjs/toolkit";
import {ServicePlanResponse} from "./servicePlanInterface";
import {fetchServicePlans} from "./servicePlanThanks";

interface ServicePlanState {
  servicePlanResponse?: ServicePlanResponse;
  servicePlanLoading: boolean;
  servicePlanError: any;
}

const initialState: ServicePlanState = {
  servicePlanResponse: undefined,
  servicePlanLoading: false,
  servicePlanError: undefined,
};
const ServicePlanSlice = createSlice({
  name: "servicePlan",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServicePlans.pending, (state) => {
        state.servicePlanLoading = true;
      })
      .addCase(fetchServicePlans.fulfilled, (state, action) => {
        state.servicePlanLoading = false;
        state.servicePlanError = null;
        const result = action.payload.ids.map((id: number, index: any) =>
          Object.assign({key: index}, {id: id}, action.payload.result[index]),
        );
        const payload = Object.assign({}, action.payload, {result: result});
        state.servicePlanResponse = payload;
      })
      .addCase(fetchServicePlans.rejected, (state, {payload}) => {
        state.servicePlanLoading = false;
        state.servicePlanError = payload;
      });
  },
});
export default ServicePlanSlice.reducer;
