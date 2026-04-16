import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const useCloudResource = () => useSelector((state: RootState) => state.cloudResource);
export const useManagedResourceSearchParams = () => useSelector((state: RootState) => state.cloudResource.managedResourceFilterParams);
export const useManagedResource = () =>
  useSelector((state: RootState) => state.cloudResource.managedResourceListResponse);
