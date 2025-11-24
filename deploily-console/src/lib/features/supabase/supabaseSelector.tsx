import {useSelector} from "react-redux";
import {RootState} from "../../store";

export const useSupabaseAppById = () =>
  useSelector((state: RootState) => state.supabaseApp.supabaseAppById);
