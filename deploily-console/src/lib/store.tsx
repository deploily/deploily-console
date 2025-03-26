import { configureStore } from "@reduxjs/toolkit";
import apiServiceSlice from "./features/apiService/apiServiceSlice";
import cartSlice from "./features/cart/cartSlice";
import cartLineSlice from "./features/cartLine/cartLineSlice";
import favoriteServiceSlice from "./features/favorites/favoriteServiceSlice";
import serviceParametersSlice from "./features/serviceParameters/serviceParametersSlice";
import serviceParameterValuesSlice from "./features/myServiceParameterValues/myServiceParameterValuesSlice";
import supportTicketSlice from "./features/support-ticket/supportTicketSlice"
import myServiceSlice from "./features/myService/myServiceSlice"
import servicePlanSlice from "./features/servicePlan/servicePlanSlice"
import ProfileServiceSlice from "./features/profile/profileServiceSlice"
import PormoCodeSlice from "./features/promoCode/promoCodeSlice"
import SubscriptionSlice from "./features/subscription/subscriptionSlice"

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
      myService: myServiceSlice,
      servicePlan: servicePlanSlice,
      profileService: ProfileServiceSlice,
      promoCode: PormoCodeSlice,
      subscription: SubscriptionSlice,
    },
  });
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
