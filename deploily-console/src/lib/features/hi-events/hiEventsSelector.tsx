import {useSelector} from "react-redux";
import {RootState} from "../../store";

export const useHiEventsAppById = () =>
  useSelector((state: RootState) => state.hiEventsApp.hiEventsAppById);
