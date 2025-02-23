import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

export const useCart = () =>
    useSelector((state: RootState) => state.cart);
