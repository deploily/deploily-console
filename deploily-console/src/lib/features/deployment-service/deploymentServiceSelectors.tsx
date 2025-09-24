import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const useDeploymentServices = () => useSelector((state: RootState) => state.deploymentService.deploymentServicesResponse);
export const useDeploymentServiceById = () => useSelector((state: RootState) => state.deploymentService.deploymentServicesByIdResponse);
export const useNewDeploymentSubscription = () => useSelector((state: RootState) => state.deploymentService.newDeploymentSubscriptionState);
