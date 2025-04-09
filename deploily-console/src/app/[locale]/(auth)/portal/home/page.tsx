import CiCdServiceContainer from "../ci-cd/components/ciCdServiceContainer";
import ApiServiceContainer from "./components/apiServiceContainer";

export default function Page() {
  return (
    <>
      <ApiServiceContainer />
      <CiCdServiceContainer />
      

    </>
  );
}
