import {configureStore} from "@reduxjs/toolkit";
import apiServiceSlice from "./features/apiService/apiServiceSlice";
import cartSlice from "./features/cart/cartSlice";
import cartLineSlice from "./features/cartLine/cartLineSlice";
import favoriteServiceSlice from "./features/favorites/favoriteServiceSlice";
import serviceParametersSlice from "./features/serviceParameters/serviceParametersSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      apiService: apiServiceSlice,
      cart: cartSlice,
      cartLine: cartLineSlice,
      favoriteService: favoriteServiceSlice,
      serviceParameters: serviceParametersSlice
    },
  });
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
