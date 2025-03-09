import {useSelector} from "react-redux";
import {RootState} from "../../store";

export const useServiceParametersValues = () => useSelector((state: RootState) => state.serviceParameterValues);
