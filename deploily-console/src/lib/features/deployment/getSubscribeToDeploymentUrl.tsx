import {deploilyApiUrls, DOCKER_SLUG} from "@/deploilyWebsiteUrls";

export const getSubscribeToDeploymentUrl = (service_slug?: string) => {
  switch (service_slug) {
    case DOCKER_SLUG:
      return deploilyApiUrls.DEPLOYMENT_DOCKER_SUBSCRIBE_URL;
    default:
      break;
  }
};
