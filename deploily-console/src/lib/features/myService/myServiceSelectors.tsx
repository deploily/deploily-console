import {useSelector} from "react-redux";
import {RootState} from "../../store";

export const useMyService = () => useSelector((state: RootState) => state.myService);
