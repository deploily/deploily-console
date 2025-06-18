import { configureStore } from "@reduxjs/toolkit";
import apiServiceSubscriptionStatesSlice from './features/api-service-subscription-states/apiServiceSubscriptionSlice';
import apiServiceSubscriptionSlice from "./features/api-service-subscriptions/apiServiceSubscriptionSlice";
import apiServiceSlice from "./features/api-service/apiServiceSlice";
import applicationServiceSlice from "./features/application/applicationServiceSlice";
import cicdServiceSlice from "./features/ci-cd-service/cicdServiceSlice";
import cloudResourceSlice from "./features/cloud-resource/cloudResourceSlice";
import contactUsSlice from "./features/contact-us/contactUsSlice";
import epaymentSlice from "./features/epayment/epaymentSlice";
import favoriteServiceSlice from "./features/favorites/favoriteServiceSlice";
import profileServiceSlice from "./features/payment-profiles/paymentProfilesSlice";
import paymentSlice from "./features/payments/paymentSlice";
import profileSlice from "./features/profile/profileSlice";
import PormoCodeSlice from "./features/promo-code/promoCodeSlice";
import servicePlanSlice from "./features/service-plans/servicePlanSlice";
import supportTicketResponsesSlice from "./features/support-ticket -responses/supportTicketResponsesSlice";
import supportTicketSlice from "./features/support-ticket/supportTicketSlice";
import subscriptionSlice from "./features/subscriptions/subscriptionSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      apiService: apiServiceSlice,
      favoriteService: favoriteServiceSlice,
      supportTicket: supportTicketSlice,
      apiServiceSubscription: apiServiceSubscriptionSlice,
      servicePlan: servicePlanSlice,
      profileService: profileServiceSlice,
      payment: paymentSlice,
      promoCode: PormoCodeSlice,
      epayment: epaymentSlice,
      apiServiceSubscriptionStates: apiServiceSubscriptionStatesSlice,
      cicdService: cicdServiceSlice,
      cloudResource: cloudResourceSlice,
      applicationService: applicationServiceSlice,
      supportTicketResponses: supportTicketResponsesSlice,
      contactUs: contactUsSlice,
      profile: profileSlice,
      subscription: subscriptionSlice,

    },
  });
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];


