import {useSelector} from "react-redux";
import {RootState} from "../../store";

export const useSelectedPlan = () =>
  useSelector((state: RootState) => state.resourceServicesPlans.selectedPlan);
export const useServicePlansByType = () =>
  useSelector((state: RootState) => state.resourceServicesPlans.servicePlansState);
