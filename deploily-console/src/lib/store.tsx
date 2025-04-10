import { configureStore } from "@reduxjs/toolkit";
import favoriteServiceSlice from "./features/favorites/favoriteServiceSlice";
import serviceParameterValuesSlice from "./features/subscribeParameterValues/subscribeParameterValuesSlice";
import supportTicketSlice from "./features/support-ticket/supportTicketSlice"
import subscriptionSlice from "./features/subscriptions/subscriptionSlice"
import servicePlanSlice from "./features/service-plans/servicePlanSlice"
import profileServiceSlice from "./features/payment-profiles/paymentProfilesSlice"
import paymentSlice from "./features/payments/paymentSlice";
import PormoCodeSlice from "./features/promo-code/promoCodeSlice"
import epaymentSlice from "./features/epayment/epaymentSlice";
import subscriptionStatesSlice from './features/subscriptionStates/subscriptionSlice'
import apiServiceSlice from "./features/api-service/apiServiceSlice";
import cicdServiceSlice from "./features/ci-cd-service/cicdServiceSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      apiService: apiServiceSlice,
      favoriteService: favoriteServiceSlice,
      serviceParameterValues: serviceParameterValuesSlice,
      supportTicket: supportTicketSlice,
      subscription: subscriptionSlice,
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
