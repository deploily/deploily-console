import ApiServiceContainer from "../api-services/home-components/apiServiceContainer";
import CiCdServiceContainer from "../ci-cd/home-components/ciCdServiceContainer";

export default function Page() {
  return (
    <>
      <ApiServiceContainer />
      <CiCdServiceContainer />
    </>
  );
}
