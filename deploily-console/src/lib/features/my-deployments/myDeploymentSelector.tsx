import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const useMyDeploymentList = () => useSelector((state: RootState) => state.myDeployment.myDeployments);
export const useMyDeploymentById = () => useSelector((state: RootState) => state.myDeployment.myDeploymentById);

