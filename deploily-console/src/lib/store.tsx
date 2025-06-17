import { configureStore, Middleware } from "@reduxjs/toolkit";
import apiServiceSlice from "./features/api-service/apiServiceSlice";
import cicdServiceSlice from "./features/ci-cd-service/cicdServiceSlice";
import contactUsSlice from "./features/contact-us/contactUsSlice";
import epaymentSlice from "./features/epayment/epaymentSlice";
import favoriteServiceSlice from "./features/favorites/favoriteServiceSlice";
import profileServiceSlice from "./features/payment-profiles/paymentProfilesSlice";
import paymentSlice from "./features/payments/paymentSlice";
import PormoCodeSlice from "./features/promo-code/promoCodeSlice";
import servicePlanSlice from "./features/service-plans/servicePlanSlice";
import subscriptionStatesSlice from './features/subscription-states/subscriptionSlice';
import subscriptionSlice from "./features/subscriptions/subscriptionSlice";
import supportTicketResponsesSlice from "./features/support-ticket -responses/supportTicketResponsesSlice";
import supportTicketSlice from "./features/support-ticket/supportTicketSlice";
import cloudResourceSlice from "./features/cloud-resource/cloudResourceSlice";
import applicationServiceSlice from "./features/application/applicationServiceSlice";
import profileSlice from "./features/profile/profileSlice";
import resourceServicesPlansSlice from "./features/resourceServicePlans/resourceServicesPlansSlice";
import resourceServicesPlansMiddleware from "./features/resourceServicePlans/resourceServicesPlansMiddleware";

export const makeStore = () => {
  return configureStore({
    reducer: {
      apiService: apiServiceSlice,
      favoriteService: favoriteServiceSlice,
      supportTicket: supportTicketSlice,
      subscription: subscriptionSlice,
      servicePlan: servicePlanSlice,
      profileService: profileServiceSlice,
      payment: paymentSlice,
      promoCode: PormoCodeSlice,
      epayment: epaymentSlice,
      subscriptionStatesSlice: subscriptionStatesSlice,
      cicdService: cicdServiceSlice,
      cloudResource: cloudResourceSlice,
      applicationService: applicationServiceSlice,
      supportTicketResponses: supportTicketResponsesSlice,
      contactUs: contactUsSlice,
      profile: profileSlice,
      resourceServicesPlans: resourceServicesPlansSlice
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().prepend(resourceServicesPlansMiddleware  as Middleware),
  });
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];


