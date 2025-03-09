import {useSelector} from "react-redux";
import {RootState} from "../../store";

export const useSupportTicket = () => useSelector((state: RootState) => state.supportTicket);
