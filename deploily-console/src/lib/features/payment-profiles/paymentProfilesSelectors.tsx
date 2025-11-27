import {useSelector} from "react-redux";
import {RootState} from "../../store";

export const usePaymentProfiles = () => useSelector((state: RootState) => state.profileService);
export const useNotDefaultPaymentProfiles = () =>
  useSelector((state: RootState) => state.profileService.notDefaultaymentProfiles);
