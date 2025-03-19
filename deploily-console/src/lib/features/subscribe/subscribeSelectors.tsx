import {useSelector} from "react-redux";
import {RootState} from "../../store";

export const useSubscribe = () => useSelector((state: RootState) => state.subscribe);
