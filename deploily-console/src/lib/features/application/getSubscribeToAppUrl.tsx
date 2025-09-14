import { deploilyApiUrls, HI_EVENTS_SLUG, NEXT_CLOUD_SLUG, ODOO_SLUG, SUPABASE_SLUG, TTK_EPAY_SLUG } from "@/deploilyWebsiteUrls";

export const getSubscribeToAppUrl = (service_slug?: string) => {
    switch (service_slug) {
        case TTK_EPAY_SLUG:
            return deploilyApiUrls.APP_TTK_EPAY_SUBSCRIBE_URL;
        case ODOO_SLUG:
            return deploilyApiUrls.APP_ODOO_SUBSCRIBE_URL;
        case SUPABASE_SLUG:
            return deploilyApiUrls.SUPABASE_APP_SUBSCRIBE_URL;
        case NEXT_CLOUD_SLUG:
            return deploilyApiUrls.NEXT_CLOUD_APP_SUBSCRIBE_URL;
        case HI_EVENTS_SLUG:    
            return deploilyApiUrls.HI_EVENTS_APP_SUBSCRIBE_URL;
        default:
            break;
    }
}