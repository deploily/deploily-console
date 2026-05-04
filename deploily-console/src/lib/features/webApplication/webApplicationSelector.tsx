import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";

export const useWebApplicationById = () => useSelector((state: RootState) => state.webApplicationDep.webApplicationById);
export const useWebApplicationDataUpdated = () => useSelector((state: RootState) => state.webApplicationDep.webApplicationDataUpdated);
