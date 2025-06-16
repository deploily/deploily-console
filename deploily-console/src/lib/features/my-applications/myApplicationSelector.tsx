import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const useMyApplicationList = () => useSelector((state: RootState) => state.myApplication.myApplications);
