import {RootState} from "@/lib/store";
import {useSelector} from "react-redux";

export const useDockerById = () => useSelector((state: RootState) => state.dockerDep.dockerById);
