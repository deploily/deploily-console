import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const useTtkEpayById = () => useSelector((state: RootState) => state.ttkEpay.ttkEpayById);
export const useTtkEpayUpdate = () => useSelector((state: RootState) => state.ttkEpay.updateTtkEpay);
export const useUpgradeTtkEpay = () => useSelector((state: RootState) => state.ttkEpay.upgradeTtkEpay);

