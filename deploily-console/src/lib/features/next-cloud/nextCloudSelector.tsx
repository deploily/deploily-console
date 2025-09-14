import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const useNextCloudAppById = () => useSelector((state: RootState) => state.nextCloudApp.nextCloudAppById);
