import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";

export const useDashboard = () => useSelector((state: RootState) => state.dashboard);
