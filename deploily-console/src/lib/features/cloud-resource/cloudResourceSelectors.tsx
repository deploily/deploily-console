import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const useCloudResource = () => useSelector((state: RootState) => state.cloudResource);
export const useMyResourceSearchParams = () => useSelector((state: RootState) => state.cloudResource.myResourceFilterParams);
export const useManagedResourceSearchParams = () => useSelector((state: RootState) => state.cloudResource.managedResourceFilterParams);
export const useManagedResource = () =>
  useSelector((state: RootState) => state.cloudResource.managedResourceListResponse);

export const useVpsManagedResource = () =>
  useSelector((state: RootState) => state.cloudResource.vpsManagedResources);
