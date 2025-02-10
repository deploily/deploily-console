import {useSelector} from "react-redux";
import {RootState} from "../../store";

export const useAllServices = () => useSelector((state: RootState) => state.apiService);
