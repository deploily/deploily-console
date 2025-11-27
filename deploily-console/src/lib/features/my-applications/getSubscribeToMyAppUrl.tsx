import {deploilyApiUrls, ODOO_SLUG, SUPABASE_SLUG, TTK_EPAY_SLUG} from "@/deploilyWebsiteUrls";

export const getRenewToMyAppUrl = (service_slug?: string) => {
  switch (service_slug) {
    case TTK_EPAY_SLUG:
      return deploilyApiUrls.TTK_EPAY_APP_SUBSCRIPTION_RENEW;
    case ODOO_SLUG:
      return deploilyApiUrls.ODOO_APP_SUBSCRIPTION_RENEW_URL;
    case SUPABASE_SLUG:
      return deploilyApiUrls.SUPABASE_APP_SUBSCRIPTION_RENEW_URL;
    default:
      break;
  }
};
export const getUpgradeToMyAppUrl = (service_slug?: string) => {
  switch (service_slug) {
    case TTK_EPAY_SLUG:
      return deploilyApiUrls.TTK_EPAY_APP_SUBSCRIPTION_UPGRADE_URL;
    case ODOO_SLUG:
      return deploilyApiUrls.ODOO_APP_SUBSCRIPTION_UPGRADE_URL;
    case SUPABASE_SLUG:
      return deploilyApiUrls.SUPABASE_APP_SUBSCRIPTION_UPGRADE_URL;
    default:
      break;
  }
};
