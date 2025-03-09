import {useSelector} from "react-redux";
import {RootState} from "../../store";

export const useServiceParameters = () => useSelector((state: RootState) => state.serviceParameters);
