import { configureStore } from "@reduxjs/toolkit";
import apiServiceSlice from "./features/apiService/apiServiceSlice";
import favoriteServiceSlice from "./features/favorites/favoriteServiceSlice";
import serviceParametersSlice from "./features/serviceParameters/serviceParametersSlice";
import serviceParameterValuesSlice from "./features/subscribeParameterValues/subscribeParameterValuesSlice";
import supportTicketSlice from "./features/support-ticket/supportTicketSlice"
import subscribeSlice from "./features/subscribe/subscribeSlice"
import servicePlanSlice from "./features/servicePlan/servicePlanSlice"
import profileServiceSlice from "./features/profileService/profileServiceSlice"
import paymentSlice from "./features/payments/paymentSlice";
import PormoCodeSlice from "./features/promoCode/promoCodeSlice"
import epaymentSlice from "./features/epayment/epaymentSlice";
import subscriptionStatesSlice from './features/subscriptionStates/subscriptionSlice'
import cicdServiceSlice from "./features/cicdService/cicdServiceSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      apiService: apiServiceSlice,
      favoriteService: favoriteServiceSlice,
      serviceParameters: serviceParametersSlice,
      serviceParameterValues: serviceParameterValuesSlice,
      supportTicket: supportTicketSlice,
      subscribe: subscribeSlice,
      servicePlan: servicePlanSlice,
      profileService: profileServiceSlice,
      payment: paymentSlice,
      promoCode: PormoCodeSlice,
      epayment: epaymentSlice,
      subscriptionStatesSlice: subscriptionStatesSlice,
      cicdService: cicdServiceSlice,
    },
  });
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
