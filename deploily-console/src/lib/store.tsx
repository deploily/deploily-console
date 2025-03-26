import { configureStore } from "@reduxjs/toolkit";
import apiServiceSlice from "./features/apiService/apiServiceSlice";
import cartSlice from "./features/cart/cartSlice";
import cartLineSlice from "./features/cartLine/cartLineSlice";
import favoriteServiceSlice from "./features/favorites/favoriteServiceSlice";
import serviceParametersSlice from "./features/serviceParameters/serviceParametersSlice";
import serviceParameterValuesSlice from "./features/subscribeParameterValues/subscribeParameterValuesSlice";
import supportTicketSlice from "./features/support-ticket/supportTicketSlice"
import subscribeSlice from "./features/subscribe/subscribeSlice"
import servicePlanSlice from "./features/servicePlan/servicePlanSlice"
import profileServiceSlice from "./features/profileService/profileServiceSlice"
import paymentSlice from "./features/payments/paymentSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      apiService: apiServiceSlice,
      cart: cartSlice,
      cartLine: cartLineSlice,
      favoriteService: favoriteServiceSlice,
      serviceParameters: serviceParametersSlice,
      serviceParameterValues: serviceParameterValuesSlice,
      supportTicket: supportTicketSlice,
      subscribe: subscribeSlice,
      servicePlan: servicePlanSlice,
      profileService: profileServiceSlice,
      payment: paymentSlice
    },
  });
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
