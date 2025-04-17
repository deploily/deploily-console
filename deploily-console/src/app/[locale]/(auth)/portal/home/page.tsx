import ApiServiceContainer from "../api-services/home-components/apiServiceContainer";
import ApplicationServiceContainer from "../application/home-components/applicationServiceContainer";
import CiCdServiceContainer from "../ci-cd/home-components/ciCdServiceContainer";
import CloudResourceContainer from "../cloud-resource/home-components/cloudResourceContainer";

export default function Page() {
  return (
    <>
      <ApiServiceContainer />
      <CiCdServiceContainer />
      <ApplicationServiceContainer />
      <CloudResourceContainer />
    </>
  );
}
