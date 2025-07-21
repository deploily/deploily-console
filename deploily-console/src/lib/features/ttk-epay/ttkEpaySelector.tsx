import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const useTtkEpayById = () => useSelector((state: RootState) => state.ttkEpay.ttkEpayById);
export const useTtkEpayUpdate = () => useSelector((state: RootState) => state.ttkEpay.updateTtkEpay);
export const useUpgradeTtkEpay = () => useSelector((state: RootState) => state.ttkEpay.upgradeTtkEpay);
export const useUpgradeTtkEpaySubscriptionState = () => useSelector((state: RootState) => state.ttkEpay.upgradeTtkEpaySubscriptionState);
export const useRenewTtkEpay = () => useSelector((state: RootState) => state.ttkEpay.renewTtkEpay);
export const useTtkEpay = () => useSelector((state: RootState) => state.ttkEpay);

