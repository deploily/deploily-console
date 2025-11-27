import {useSelector} from "react-redux";
import {RootState} from "../../store";

export const useApplicationServicesList = () =>
  useSelector((state: RootState) => state.applicationService.applicationServices);
export const useApplicationServiceById = () =>
  useSelector((state: RootState) => state.applicationService.applicationServicesById);
export const useNewApplicationSubscription = () =>
  useSelector((state: RootState) => state.applicationService.newAppSubscriptionState);
export const useNewApplicationSubscriptionResponse = () =>
  useSelector((state: RootState) => state.applicationService.newApplicationSubscriptionResponse);
