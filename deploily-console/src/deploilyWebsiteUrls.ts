
export const NEXT_PUBLIC_SITE_KEY = "6Ldb_i8rAAAAAAbj8Z8zS9cx23EX_wVX7D30FdSM";

const API_BASE_URL = `/api/v1`;
export const DOC_URL = "https://docs.deploily.cloud";

export const deploilyApiUrls = {
  SERVICE_URL: `${API_BASE_URL}/service/`,
  SERVICE_PLAN_URL: `${API_BASE_URL}/service-plan`,
  SUBSCRIBE_URL: `${API_BASE_URL}/subscription/`,
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
  SERVICE_SUBSCRIPTION: `${API_BASE_URL}/service-subscription/subscribe`,
  CHECK_PROMO_CODE: `${API_BASE_URL}/promo-code/`,
  EPAYMENT_STATUS: `${API_BASE_URL}/service-subscription/payment-status`,
  CONTACT_US: `${API_BASE_URL}/contact-us/`,
  USER: `${API_BASE_URL}/user/me`,
  FUND_BALANCE: `${API_BASE_URL}/balance/fund-balance`,
  GENERATE_PDF_RECEIPT: `${API_BASE_URL}/service-subscription/generate-pdf-receipt`,
  SEND_PDF_RECEIPT_EMAIL: `${API_BASE_URL}/service-subscription/send-pdf-receipt_mail`,
  SERVICE_RESSOURCE_PROVIDERS: `${API_BASE_URL}/service-ressource-providers/`,
};
