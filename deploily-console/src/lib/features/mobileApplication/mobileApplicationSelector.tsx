import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";

export const useMobileApplicationById = () => useSelector((state: RootState) => state.mobileApplicationDep.mobileApplicationById);
export const useMobileApplicationDataUpdated = () => useSelector((state: RootState) => state.mobileApplicationDep.mobileApplicationDataUpdated);
