import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const useMyApplicationList = () => useSelector((state: RootState) => state.myApplication.myApplications);
export const useMyApplicationById = () => useSelector((state: RootState) => state.myApplication.myApplicationById);
export const useUpgradeMyApplication = () => useSelector((state: RootState) => state.myApplication.upgradeMyApplication);
export const useUpgradeMyApplicationState = () => useSelector((state: RootState) => state.myApplication.upgradeMyApplicationState);
export const useRenewMyApplication = () => useSelector((state: RootState) => state.myApplication.renewMyApplication);
export const useMyApplication = () => useSelector((state: RootState) => state.myApplication);

