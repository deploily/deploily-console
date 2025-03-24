import {useSelector} from "react-redux";
import {RootState} from "../../store";

export const useProfileServices = () => useSelector((state: RootState) => state.profileService);
