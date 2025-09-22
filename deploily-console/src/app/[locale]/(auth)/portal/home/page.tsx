import ApiServiceContainer from "../api-services/home-components/apiServiceContainer";
import ApplicationServiceContainer from "../application/home-components/applicationServiceContainer";
import CloudResourceContainer from "../cloud-resources/home-components/cloudResourceContainer";
import DeploymentsServiceContainer from "../deployments/home-components/deploymentsServiceContainer";

export default function Page() {
  return (
    <div style={{ padding: '6px' }}>
      {/* <div style={{ opacity: 0.5, pointerEvents: "none" }}> */}
      <DeploymentsServiceContainer />
      {/* </div> */}
      <ApplicationServiceContainer />
      <ApiServiceContainer />
      <CloudResourceContainer />
    </div>
  );
}
