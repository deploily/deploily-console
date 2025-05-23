import {useSelector} from "react-redux";
import {RootState} from "../../store";

export const useSubscription = () => useSelector((state: RootState) => state.subscription);
