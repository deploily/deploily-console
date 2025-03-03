import {useSelector} from "react-redux";
import {RootState} from "../../store";

export const useFavoriteServices = () => useSelector((state: RootState) => state.favoriteService);
