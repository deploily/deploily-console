import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const useSubscriptionList = () => useSelector((state: RootState) => state.subscription.subscriptionsState);
export const useSubscriptionHistoryList = () => useSelector((state: RootState) => state.subscription.subscriptionHistoryState);
