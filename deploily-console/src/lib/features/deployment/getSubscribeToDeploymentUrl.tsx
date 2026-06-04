import {deploilyApiUrls, MOBILE_APPLICATION_SLUG, WEB_APPLICATION_SLUG} from "@/deploilyWebsiteUrls";

export const getSubscribeToDeploymentUrl = (service_slug?: string) => {
  switch (service_slug) {
    case WEB_APPLICATION_SLUG:
      return deploilyApiUrls.DEPLOYMENT_WEB_APPLICATION_SUBSCRIBE_URL;
    case MOBILE_APPLICATION_SLUG:
      return deploilyApiUrls.DEPLOYMENT_MOBILE_APPLICATION_SUBSCRIBE_URL;
    default:
      break;
  }
};
