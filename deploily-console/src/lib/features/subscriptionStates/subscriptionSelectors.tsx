import {useSelector} from "react-redux";
import {RootState} from "../../store";

export const useSubscriptionStates = () => useSelector((state: RootState) => state.subscriptionStatesSlice);
