import {useSelector} from "react-redux";
import {RootState} from "../../store";

export const usePayment = () => useSelector((state: RootState) => state.payment);
