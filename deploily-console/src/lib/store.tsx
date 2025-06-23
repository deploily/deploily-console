import { configureStore, Middleware } from "@reduxjs/toolkit";
import apiServiceSubscriptionStatesSlice from './features/api-service-subscription-states/apiServiceSubscriptionSlice';
import apiServiceSubscriptionSlice from "./features/api-service-subscriptions/apiServiceSubscriptionSlice";
import apiServiceSlice from "./features/api-service/apiServiceSlice";
import applicationServiceSlice from "./features/application/applicationServiceSlice";
import cicdServiceSlice from "./features/ci-cd-service/cicdServiceSlice";
import cloudResourceSlice from "./features/cloud-resource/cloudResourceSlice";
import contactUsSlice from "./features/contact-us/contactUsSlice";
import epaymentSlice from "./features/epayment/epaymentSlice";
import favoriteServiceSlice from "./features/favorites/favoriteServiceSlice";
import paymentProfileMiddleware from "./features/payment-profiles/paymentProfileMiddleware";
import profileServiceSlice from "./features/payment-profiles/paymentProfilesSlice";
import paymentSlice from "./features/payments/paymentSlice";
import profileSlice from "./features/profile/profileSlice";
import PormoCodeSlice from "./features/promo-code/promoCodeSlice";
import resourceServicesPlansMiddleware from "./features/resourceServicePlans/resourceServicesPlansMiddleware";
import resourceServicesPlansSlice from "./features/resourceServicePlans/resourceServicesPlansSlice";
import servicesPlansMiddleware from "./features/service-plans/servicePlanMiddleWare";
import servicePlanSlice from "./features/service-plans/servicePlanSlice";
import supportTicketResponsesSlice from "./features/support-ticket -responses/supportTicketResponsesSlice";
import supportTicketSlice from "./features/support-ticket/supportTicketSlice";
import myApplicationSlice from "./features/my-applications/myApplicationSlice"
import ttkEpaySlice from "./features/ttk-epay/ttkEpaySlice"
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
      resourceServicesPlans: resourceServicesPlansSlice,
      myApplication: myApplicationSlice,
      ttkEpay: ttkEpaySlice,
      subscription: subscriptionSlice,

    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().prepend(resourceServicesPlansMiddleware as Middleware).prepend(paymentProfileMiddleware as Middleware).prepend(servicesPlansMiddleware as Middleware),
  });
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];


