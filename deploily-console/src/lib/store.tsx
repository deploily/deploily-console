import {configureStore} from "@reduxjs/toolkit";
import apiServiceSlice from "./features/apiService/apiServiceSlice";
import cartSlice from "./features/cart/cartSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      apiService: apiServiceSlice,
      cart: cartSlice,
    },
  });
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
