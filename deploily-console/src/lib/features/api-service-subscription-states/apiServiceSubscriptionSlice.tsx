import { calculateRemainingSubscriptionValue } from "@/lib/utils/subscriptionUtils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaymentProfileInterface } from "../payment-profiles/paymentProfilesInterface";
import { ServicePlan } from "../service-plans/servicePlanInterface";

interface ApiServiceSubscriptionStates {
  duration: number;
  oldDuration: number;
  isBalanceSufficient: boolean | null;
  totalAmount: number;
  price: number;
  oldPrice: number;
  start_date: string;
  selectedProfile?: PaymentProfileInterface;
  openDrawer: boolean;
  selectedPlan: ServicePlan | null;
  phone?: string;

}
const initialState: ApiServiceSubscriptionStates = {
  isBalanceSufficient: null,
  totalAmount: 0,
  duration: 1,
  price: 0,
  oldPrice: 0,
  start_date: new Date().toISOString(),
  selectedProfile: undefined,
  openDrawer: false,
  selectedPlan: null,
  oldDuration: 1,
  phone: "",
};

const apiServiceSubscriptionStatesSlice = createSlice({
  name: "ApiServiceSubscriptionStates",
  initialState,
  reducers: {
    updateApiServiceSubscriptionStates: (state, action: PayloadAction<any>) => {
      let updatedState = { ...state, ...action.payload };
      const updatedAmount = updatedState.duration * updatedState.price;
      updatedState = { ...updatedState, totalAmount: updatedAmount };

      if (state.selectedProfile != undefined) {
        if (state.selectedProfile.balance - updatedState.totalAmount >= 0) {
          updatedState.isBalanceSufficient = true;
        } else {
          updatedState.isBalanceSufficient = false;
        }
      }

      return updatedState;
    },

    updateSelectedProfile: (state, action) => {
      state.selectedProfile = action.payload;
      if (state.selectedProfile != undefined) {
        if (state.selectedProfile.balance - state.totalAmount >= 0) {
          state.isBalanceSufficient = true;
        } else {
          state.isBalanceSufficient = false;
        }
      }
    },
    openDrawer: (state, action) => {
      state.openDrawer = true;
      state.selectedPlan = action.payload;
    },
    closeDrawer: (state) => {
      state.openDrawer = false;
      state.selectedPlan = null;
    },
  },
});

export const {
  updateApiServiceSubscriptionStates,
  openDrawer,
  closeDrawer,
} = apiServiceSubscriptionStatesSlice.actions;

export default apiServiceSubscriptionStatesSlice.reducer;
