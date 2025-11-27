import {useSelector} from "react-redux";
import {RootState} from "../../store";

export const useOdooAppById = () => useSelector((state: RootState) => state.odooApp.odooAppById);
