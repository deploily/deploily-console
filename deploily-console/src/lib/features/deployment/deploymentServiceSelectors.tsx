import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const useDeploymentServices = () =>
  useSelector((state: RootState) => state.deploymentService.deploymentServicesResponse);
export const useDeploymentServiceBySlug = () =>
  useSelector((state: RootState) => state.deploymentService.deploymentServicesBySlugResponse);
export const useNewDeploymentSubscription = () =>
  useSelector((state: RootState) => state.deploymentService.newDeploymentSubscriptionState);
export const useNewDeploymentSubscriptionResponse = () => useSelector((state: RootState) => state.deploymentService.newDeploymentSubscriptionResponse);
