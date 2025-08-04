import ApiServiceContainer from "../api-services/home-components/apiServiceContainer";
import ApplicationServiceContainer from "../application/home-components/applicationServiceContainer";
import CiCdServiceContainer from "../ci-cd/home-components/ciCdServiceContainer";
import CloudResourceContainer from "../cloud-resources/home-components/cloudResourceContainer";

export default function Page() {
  return (
    <div style={{padding:'6px'}}>
      <ApiServiceContainer />
      <ApplicationServiceContainer />
      <CloudResourceContainer />     
      <div style={{ opacity: 0.5, pointerEvents: "none" }}>
        <CiCdServiceContainer />
      </div>
    </div>
  );
}
