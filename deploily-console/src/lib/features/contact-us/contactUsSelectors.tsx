import {useSelector} from "react-redux";
import {RootState} from "../../store";

export const useContactUs = () => useSelector((state: RootState) => state.contactUs);
