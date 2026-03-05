import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const useCloudResource = () => useSelector((state: RootState) => state.cloudResource);
export const useManagedResource = () =>
  useSelector((state: RootState) => state.cloudResource.managedResourceListResponse);
export const useWebHosting = () =>
  useSelector((state: RootState) => state.cloudResource.myWebHostingsResponse);
export const useDns = () =>
  useSelector((state: RootState) => state.cloudResource.myDnsResponse);
