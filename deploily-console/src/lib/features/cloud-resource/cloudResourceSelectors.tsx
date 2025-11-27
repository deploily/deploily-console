import {useSelector} from "react-redux";
import {RootState} from "../../store";

export const useCloudResource = () => useSelector((state: RootState) => state.cloudResource);
export const useManagedResource = () =>
  useSelector((state: RootState) => state.cloudResource.managedResourceListResponse);
