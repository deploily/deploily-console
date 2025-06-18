import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const useTtkEpayById = () => useSelector((state: RootState) => state.ttkEpay.ttkEpayById);

