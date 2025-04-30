import {useSelector} from "react-redux";
import {RootState} from "../../store";

export const useProfile = () => useSelector((state: RootState) => state.profile);
