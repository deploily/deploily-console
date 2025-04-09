import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProfileServiceInterface } from "../profileService/profileServiceInterface";

interface SubscriptionStates {
  promoCode: string,
  duration: number,
  isBalanceSufficient: boolean|null,
  totalAmount: number,
  promoCodeRate?: number,
  promoColor: string,
  payment_method: string,
  price: number,
  selectedProfile?: ProfileServiceInterface
}

const initialState: SubscriptionStates = {
  promoCode: "",
  isBalanceSufficient: null,
  totalAmount: 0,
  promoCodeRate: undefined,
  promoColor: "red",
  duration: 1,
  price: 0,
  selectedProfile: undefined,
  payment_method: "card",
};

const SubscriptionStatesSlice = createSlice({
  name: "SubscriptionStates",
  initialState,
  reducers: {
    updateSubscriptionStates: (state, action: PayloadAction<any>) => {
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
    updateSelectedProfile: (state, action) => {
      state.selectedProfile = action.payload
      if (state.selectedProfile != undefined) {
        if ((state.selectedProfile.balance - state.totalAmount) >= 0) {
          state.isBalanceSufficient = true;
        } else {
          state.isBalanceSufficient = false;
        }
      }
    }
  },
});
export default SubscriptionStatesSlice.reducer;
