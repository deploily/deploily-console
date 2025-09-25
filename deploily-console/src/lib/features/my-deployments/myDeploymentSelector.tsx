import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const useMyDeploymentList = () => useSelector((state: RootState) => state.myDeployment.myDeployments);

