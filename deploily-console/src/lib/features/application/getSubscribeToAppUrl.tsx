import { deploilyApiUrls, TTK_EPAY_SLUG } from "@/deploilyWebsiteUrls";

export const getSubscribeToAppUrl =(service_slug?:string)=>{
    switch (service_slug) {
        case TTK_EPAY_SLUG:
            return deploilyApiUrls.APP_TTK_EPAY_SUBSCRIBE_URL;
    
        default:
            break;
    }
}