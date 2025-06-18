import {useSelector} from "react-redux";
import {RootState} from "../../store";

export const useApiServiceSubscriptionStates = () => useSelector((state: RootState) => state.apiServiceSubscriptionStates);
