import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";

export const useSelectWilaya = () => useSelector((state: RootState) => state.wilaya);
