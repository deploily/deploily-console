import { configureStore, Middleware } from "@reduxjs/toolkit";
import apiServiceSubscriptionStatesSlice from './features/api-service-subscription-states/apiServiceSubscriptionSlice';
import apiServiceSubscriptionSlice from "./features/api-service-subscriptions/apiServiceSubscriptionSlice";
import apiServiceSlice from "./features/api-service/apiServiceSlice";
import applicationServiceSlice from "./features/application/applicationServiceSlice";
import cloudResourceSlice from "./features/cloud-resource/cloudResourceSlice";
import contactUsSlice from "./features/contact-us/contactUsSlice";
import epaymentSlice from "./features/epayment/epaymentSlice";
import favoriteServiceSlice from "./features/favorites/favoriteServiceSlice";
import hiEventsAppSlice from "./features/hi-events/hiEventsSlice";
import myApplicationSlice from "./features/my-applications/myApplicationSlice";
import nextCloudAppSlice from "./features/next-cloud/nextCloudSlice";
import odooAppSlice from "./features/odoo/odooSlice";
import paymentProfileMiddleware from "./features/payment-profiles/paymentProfileMiddleware";
import profileServiceSlice from "./features/payment-profiles/paymentProfilesSlice";
import paymentSlice from "./features/payments/paymentSlice";
import profileSlice from "./features/profile/profileSlice";
import PormoCodeSlice from "./features/promo-code/promoCodeSlice";
import resourceServicesPlansMiddleware from "./features/resourceServicePlans/resourceServicesPlansMiddleware";
import resourceServicesPlansSlice from "./features/resourceServicePlans/resourceServicesPlansSlice";
import wilayaSlice from "./features/select-wilaya/selectWilayaSlice";
import servicesPlansMiddleware from "./features/service-plans/servicePlanMiddleWare";
import servicePlanSlice from "./features/service-plans/servicePlanSlice";
import subscriptionSlice from "./features/subscriptions/subscriptionSlice";
import supabaseAppSlice from "./features/supabase/supabaseSlice";
import supportTicketResponsesSlice from "./features/support-ticket -responses/supportTicketResponsesSlice";
import supportTicketSlice from "./features/support-ticket/supportTicketSlice";
import ttkEpaySlice from "./features/ttk-epay/ttkEpaySlice";
import DeploymentServiceSlice from "./features/deployment-service/deploymentServiceSlice";
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
      deploymentService: DeploymentServiceSlice,
      cloudResource: cloudResourceSlice,
      applicationService: applicationServiceSlice,
      supportTicketResponses: supportTicketResponsesSlice,
      contactUs: contactUsSlice,
      profile: profileSlice,
      resourceServicesPlans: resourceServicesPlansSlice,
      myApplication: myApplicationSlice,
      ttkEpay: ttkEpaySlice,
      odooApp: odooAppSlice,
      supabaseApp: supabaseAppSlice,
      subscription: subscriptionSlice,
      wilaya: wilayaSlice,
      nextCloudApp: nextCloudAppSlice,
      hiEventsApp: hiEventsAppSlice,

    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().prepend(resourceServicesPlansMiddleware as Middleware).prepend(paymentProfileMiddleware as Middleware).prepend(servicesPlansMiddleware as Middleware),
  });
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

