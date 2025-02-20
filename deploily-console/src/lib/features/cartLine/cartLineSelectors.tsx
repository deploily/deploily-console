import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const useCartLine = () => useSelector((state: RootState) => state.cartLine);
