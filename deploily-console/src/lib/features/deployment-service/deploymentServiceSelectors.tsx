import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const useDeploymentService = () => useSelector((state: RootState) => state.deploymentService);
export const useDeploymentServiceById = () => useSelector((state: RootState) => state.deploymentService.deploymentServicesByIdResponse);
export const useDeploymentServices = () => useSelector((state: RootState) => state.deploymentService.deploymentServicesResponse);