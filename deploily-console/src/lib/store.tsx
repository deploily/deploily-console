import {configureStore} from "@reduxjs/toolkit";
import apiServiceSlice from "./features/apiService/apiServiceSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      apiService: apiServiceSlice,
    },
  });
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
