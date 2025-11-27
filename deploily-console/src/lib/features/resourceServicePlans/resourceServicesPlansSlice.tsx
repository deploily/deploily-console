import {createSlice} from "@reduxjs/toolkit";
import {ServicePlan} from "../service-plans/servicePlanInterface";
import {fetchResourceServicesPlans} from "./resourceServicesPlansThunk";
import {ResourceServicesPlansResponse} from "./resourceServicesPlansInterface";

interface ServicePlansState {
  servicePlansIsloading: boolean;
  servicePlansList?: ResourceServicesPlansResponse;
  servicePlansloadingError: boolean;
}
interface ResourceServicesPlansState {
  servicePlansState: ServicePlansState;
  selectedPlan?: ServicePlan;
}

const initialState: ResourceServicesPlansState = {
  servicePlansState: {
    servicePlansIsloading: false,
    servicePlansloadingError: false,
    servicePlansList: undefined,
  },
  selectedPlan: undefined,
};
const ResourceServicesPlansSlice = createSlice({
  name: "resourceServicesPlansSlice",
  initialState,
  reducers: {
    updateSelectedPlan: (state, action) => {
      state.selectedPlan = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchResourceServicesPlans.pending, (state) => {
        state.servicePlansState.servicePlansIsloading = true;
      })
      .addCase(fetchResourceServicesPlans.fulfilled, (state, action) => {
        state.servicePlansState.servicePlansIsloading = false;
        state.servicePlansState.servicePlansloadingError = false;
        state.servicePlansState.servicePlansList = action.payload;
      })
      .addCase(fetchResourceServicesPlans.rejected, (state) => {
        state.servicePlansState.servicePlansIsloading = false;
        state.servicePlansState.servicePlansloadingError = true;
      });
  },
});

export const {updateSelectedPlan} = ResourceServicesPlansSlice.actions;

export default ResourceServicesPlansSlice.reducer;
