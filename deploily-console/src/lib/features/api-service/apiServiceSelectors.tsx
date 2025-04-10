import {useSelector} from "react-redux";
import {RootState} from "../../store";

export const useApiServices = () => useSelector((state: RootState) => state.apiService);
