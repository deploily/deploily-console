import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const useProvider = () => useSelector((state: RootState) => state.provider);