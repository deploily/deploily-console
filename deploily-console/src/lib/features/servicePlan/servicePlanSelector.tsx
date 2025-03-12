import {useSelector} from "react-redux";
import {RootState} from "../../store";

export const useServicePlan = () => useSelector((state: RootState) => state.servicePlan);
