import { calculateRemainingSubscriptionValue } from "@/lib/utils/subscriptionUtils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaymentProfileInterface } from "../payment-profiles/paymentProfilesInterface";
import { ServicePlan } from "../service-plans/servicePlanInterface";

interface ApiServiceSubscriptionStates {
  promoCode: string;
  duration: number;
  oldDuration: number;
  isBalanceSufficient: boolean | null;
  totalAmount: number;
  promoCodeRate?: number;
  promoColor?: string;
  price: number;
  oldPrice: number;
  start_date: Date;
  selectedProfile?: PaymentProfileInterface;
  openDrawer: boolean;
  selectedPlan: ServicePlan | null;
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
  oldDuration:1
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

      return updatedState;
    },

    upgradeApiServiceSubscriptionStates: (state, action: PayloadAction<any>) => {

      console.log("Upgrade Action Payload:", action.payload);
      console.log("State:", state);

      const updatedState = { ...state, ...action.payload };

      const oldPlanValueRemaining = calculateRemainingSubscriptionValue({
        price: updatedState.oldPrice,
        start_date: updatedState.start_date,
        duration_month: updatedState.oldDuration,
      });

      console.log("Old Plan Value Remaining:", oldPlanValueRemaining);


      const newTotal = updatedState.duration * updatedState.price;
      console.log("New Total:", newTotal);

      // if (updatedState.promoCodeRate !== undefined) {
      //   updatedState.promoColor = "green";
      //   newTotal = newTotal - ((newTotal * updatedState.promoCodeRate) / 100);
      // }
      if (newTotal < oldPlanValueRemaining){
        updatedState.totalAmount = 0;

      }else{
      const finalAmount = newTotal - oldPlanValueRemaining;
      updatedState.totalAmount = Math.round(finalAmount);
      }
   

      if (updatedState.selectedProfile) {
        updatedState.isBalanceSufficient = updatedState.selectedProfile.balance >= updatedState.totalAmount;
      }
      state = updatedState;
      return state;
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

export const { updateApiServiceSubscriptionStates, upgradeApiServiceSubscriptionStates, openDrawer, closeDrawer } = apiServiceSubscriptionStatesSlice.actions;


export default apiServiceSubscriptionStatesSlice.reducer;
