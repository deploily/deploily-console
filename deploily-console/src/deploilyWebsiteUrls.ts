
export const NEXT_PUBLIC_SITE_KEY = "6Ldb_i8rAAAAAAbj8Z8zS9cx23EX_wVX7D30FdSM";

const API_BASE_URL = `/api/v1`;
export const DOC_URL = "https://docs.deploily.cloud";
export const HUB_URL = "https://hub.deploily.cloud/forum/help-1";

export const deploilyApiUrls = {
  SERVICE_URL: `${API_BASE_URL}/service/`,
  API_SERVICE_URL: `${API_BASE_URL}/api-service/`,
  SERVICE_PLAN_URL: `${API_BASE_URL}/service-plan`,
  SUBSCRIBE_URL: `${API_BASE_URL}/subscription/`,
  API_SERVICE_SUBSCRIBE_URL: `${API_BASE_URL}/api-service-subscription/`,
  MY_FAVORITE_URL: `${API_BASE_URL}/my-favorites/`,
  POST_FAVORITE_SERVICE_URL: `${API_BASE_URL}/my-favorites/service`,
  SUPPORT_TICKET_URL: `${API_BASE_URL}/support-ticket/`,
  SUPPORT_TICKET_RESPONSES_URL: `${API_BASE_URL}/support-ticket-response/`,
  LOGIN_URL: `${API_BASE_URL}/security/login/`,
  SERVICE_PARAMETER_URL: ` ${API_BASE_URL}/parameter/`,
  SERVICE_PARAMETER_VALUES_URL: ` ${API_BASE_URL}/parameter-value/`,
  SERVICE_CONSUMER: ` ${API_BASE_URL}/my-service/`,
  PAYMENT_PROFILE_URL: `${API_BASE_URL}/payment-profile/`,
  PAYMENT: `${API_BASE_URL}/payments/`,
  PAYMENT_RECEIPT: `/upload-receipt`,
  SERVICE_SUBSCRIPTION: `${API_BASE_URL}/api-service-subscription/subscribe`,
  API_SERVICE_SUBSCRIPTION: `${API_BASE_URL}/api-service-subscription/subscribe`,
  EPAYMENT_STATUS: `${API_BASE_URL}/service-subscription/payment-status`,
  CONTACT_US: `${API_BASE_URL}/contact-us/`,
  USER: `${API_BASE_URL}/user/me`,
  FUND_BALANCE: `${API_BASE_URL}/balance/fund-balance`,
  GENERATE_PDF_RECEIPT: `${API_BASE_URL}/service-subscription/generate-pdf-receipt`,
  SEND_PDF_RECEIPT_EMAIL: `${API_BASE_URL}/service-subscription/send-pdf-receipt_mail`,
  SERVICE_RESSOURCE: `${API_BASE_URL}/ressource-service/`,
  PROVIDER_URL: `${API_BASE_URL}/service-ressource-providers/`,
  CREATE_AFFILIATION_URL: `${API_BASE_URL}/affiliation/create`,
  AFFILIATION_URL: `${API_BASE_URL}/affiliation/`,
  APPP_SERVICES_URL: `${API_BASE_URL}/app-service/`,
  APP_TTK_EPAY_SUBSCRIBE_URL: `${API_BASE_URL}/ttk-epay-app-service-subscription/subscribe`,
  RESOURCE_CATEGORY_URL: `${API_BASE_URL}/ressource-category/all`,
  APP_SERVICE_SUBSCRIPTION_URL: `${API_BASE_URL}/app-service-subscription/`,
  TTK_EPAY_APP_SUBSCRIPTION_URL: `${API_BASE_URL}/ttk-epay-app-service-subscription`,
  RESOURCE_SERVICE_PLANS_URL: `${API_BASE_URL}/service-plan-ressource-vps/all`,

  ODOO_APP_SUBSCRIPTION_URL: `${API_BASE_URL}/odoo-app-service-subscription`,
  APP_ODOO_SUBSCRIBE_URL: `${API_BASE_URL}/odoo-app-service-subscription/subscribe`,

  SUPABASE_APP_SUBSCRIBE_URL: `${API_BASE_URL}/supabase-app-service-subscription/subscribe`,
  SUPABASE_APP_SUBSCRIPTION_URL: `${API_BASE_URL}/supabse-app-service-subscription`,

  NEXT_CLOUD_APP_SUBSCRIBE_URL: `${API_BASE_URL}/nextcloud-app-service-subscription/subscribe`,
  NEXT_CLOUD_APP_SUBSCRIPTION_URL: `${API_BASE_URL}/nextcloud-app-service-subscription`,

  HI_EVENTS_APP_SUBSCRIBE_URL: `${API_BASE_URL}/hi-events-app-service-subscription/subscribe`,
  HI_EVENTS_APP_SUBSCRIPTION_URL: `${API_BASE_URL}/hi-events-app-service-subscription`,

  HISTORY_SUBSCRIPTION_URL: `${API_BASE_URL}/subscription/history`,

  MANAGED_RESSOURCE_URL: `${API_BASE_URL}/managed-ressource/`,


  DEPLOYMENT_SERVICES_URL: `${API_BASE_URL}/deployment-service/`,
  DEPLOYMENT_SERVICE_SUBSCRIPTION_URL: `${API_BASE_URL}/deployment-service-subscription/`,
  COSTUM_PARAMETER_URL: `${API_BASE_URL}/custom-parameter`,

  DEPLOYMENT_WEB_APPLICATION_SUBSCRIBE_URL: `${API_BASE_URL}/web-application-deployment-service-subscription/subscribe`,
  DEPLOYMENT_WEB_APPLICATION_SUBSCRIPTION_URL: `${API_BASE_URL}/web-application-deployment-service-subscription`,

  DEPLOYMENT_MOBILE_APPLICATION_SUBSCRIBE_URL: `${API_BASE_URL}/mobile-application-deployment-service-subscription/subscribe`,
  DEPLOYMENT_MOBILE_APPLICATION_SUBSCRIPTION_URL: `${API_BASE_URL}/mobile-application-deployment-service-subscription`,

  DASHBOARD_URL: `${API_BASE_URL}/dashboard/`

};

// Application Slugs
export const TTK_EPAY_SLUG = "ttk-epay";
export const ODOO_SLUG = "odoo";
export const SUPABASE_SLUG = "supabase";
export const NEXT_CLOUD_SLUG = "nextcloud";
export const HI_EVENTS_SLUG = "hievents";

// Deployment Service Slugs
export const WEB_APPLICATION_SLUG = "web-application";
export const MOBILE_APPLICATION_SLUG = "mobile-application";
