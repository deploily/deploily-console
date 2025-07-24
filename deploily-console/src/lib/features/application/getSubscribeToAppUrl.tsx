import { deploilyApiUrls, ODOO_SLUG, TTK_EPAY_SLUG } from "@/deploilyWebsiteUrls";

export const getSubscribeToAppUrl =(service_slug?:string)=>{
    switch (service_slug) {
        case TTK_EPAY_SLUG:
            return deploilyApiUrls.APP_TTK_EPAY_SUBSCRIBE_URL;
        case ODOO_SLUG:
            return deploilyApiUrls.APP_ODOO_SUBSCRIBE_URL;
    
        default:
            break;
    }
}