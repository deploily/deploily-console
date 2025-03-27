import {useSelector} from "react-redux";
import {RootState} from "../../store";

export const useEpayment = () => useSelector((state: RootState) => state.epayment);
