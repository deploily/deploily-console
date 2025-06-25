import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const useMyApplicationList = () => useSelector((state: RootState) => state.myApplication.myApplications);
export const useMyApplicationById = () => useSelector((state: RootState) => state.myApplication.myApplicationById);

