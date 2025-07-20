import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaymentProfileInterface } from "../payment-profiles/paymentProfilesInterface";
import { calculateRemainingSubscriptionValue } from "@/lib/utils/subscriptionUtils";

interface ApiServiceSubscriptionStates {
  promoCode: string;
  duration: number;
  isBalanceSufficient: boolean | null;
  totalAmount: number;
  promoCodeRate?: number;
  promoColor?: string;
  price: number;
  oldPrice: number;
  start_date: Date;
  selectedProfile?: PaymentProfileInterface;
  openDrawer: boolean;
  selectedPlan: any; // <- should not be `null` as default; needs a type
}
const initialState: ApiServiceSubscriptionStates = {
  promoCode: "",
  isBalanceSufficient: null,
  totalAmount: 0,
  promoCodeRate: undefined,
  promoColor: undefined,
  duration: 1,
  price: 0,
  oldPrice: 0,
  start_date: new Date(),
  selectedProfile: undefined,
  openDrawer: false,
  selectedPlan: null,
};


const apiServiceSubscriptionStatesSlice = createSlice({
  name: "ApiServiceSubscriptionStates",
  initialState,
  reducers: {
    updateApiServiceSubscriptionStates: (state, action: PayloadAction<any>) => {
      let updatedState = { ...state, ...action.payload }
      let updatedAmount = updatedState.duration * updatedState.price
      if (updatedState.promoCodeRate != undefined) {
        updatedState = { ...updatedState, promoColor: "green" }
        updatedAmount = updatedAmount - ((updatedAmount * updatedState.promoCodeRate) / 100);
      }
      updatedState = { ...updatedState, totalAmount: updatedAmount }

      if (state.selectedProfile != undefined) {
        if ((state.selectedProfile.balance - updatedState.totalAmount) >= 0) {
          updatedState.isBalanceSufficient = true;
        } else {
          updatedState.isBalanceSufficient = false;
        }
      }
      console.log(updatedState);

      return updatedState;
    },

    upgradeApiServiceSubscriptionStates: (state, action: PayloadAction<any>) => {
      Object.assign(state, action.payload);

      const oldPlanValueRemaining = calculateRemainingSubscriptionValue({
        price: state.oldPrice,
        start_date: state.start_date,
        duration_month: state.duration,
      });

      let newTotal = state.duration * state.price;

      if (state.promoCodeRate !== undefined) {
        state.promoColor = "green";
        newTotal -= (newTotal * state.promoCodeRate) / 100;
      }

      const finalAmount = Math.max(newTotal - oldPlanValueRemaining, 0);
      state.totalAmount = Math.floor(finalAmount / 100) * 100;

      if (state.selectedProfile) {
        state.isBalanceSufficient = state.selectedProfile.balance >= state.totalAmount;
      }
    },
    

    updateSelectedProfile: (state, action) => {
      state.selectedProfile = action.payload
      if (state.selectedProfile != undefined) {
        if ((state.selectedProfile.balance - state.totalAmount) >= 0) {
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

export const { updateApiServiceSubscriptionStates, upgradeApiServiceSubscriptionStates , openDrawer, closeDrawer } = apiServiceSubscriptionStatesSlice.actions;

export default apiServiceSubscriptionStatesSlice.reducer;
