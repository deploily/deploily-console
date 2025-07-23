import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const useApiServiceSubscription = () => useSelector((state: RootState) => state.apiServiceSubscription);
export const useUpgradeApiServiceSubscription = () => useSelector((state: RootState) => state.apiServiceSubscription.newUpgradeApiSubscriptionResponse);
