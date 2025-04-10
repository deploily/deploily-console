import {useSelector} from "react-redux";
import {RootState} from "../../store";

export const usePromoCode = () => useSelector((state: RootState) => state.promoCode);
