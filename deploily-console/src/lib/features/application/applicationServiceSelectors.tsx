import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const useApplicationService = () => useSelector((state: RootState) => state.applicationService);