export const BASE_URL = `${process.env.API_BASE_URL}`;
export const IMAGES_URL = `${process.env.BASE_URL}/static/uploads/`;
export const DOC_URL = "https://docs.deploily.cloud";

export const deploilyApiUrls = {
  SERVICE_URL: `${process.env.API_BASE_URL}/service/`,
  SERVICE_PLAN_URL: `${process.env.API_BASE_URL}/service-plan`,
  SUBSCRIBE_URL: `${process.env.API_BASE_URL}/subscription/`,
  MY_FAVORITE_URL: `${process.env.API_BASE_URL}/my-favorites/`,
  POST_FAVORITE_SERVICE_URL: `${process.env.API_BASE_URL}/my-favorites-service/`,
  SUPPORT_TICKET_URL: `${process.env.API_BASE_URL}/support-ticket/`,
  SUPPORT_TICKET_RESPONSES_URL: `${process.env.API_BASE_URL}/support-ticket-response/`,
  LOGIN_URL: `${process.env.API_BASE_URL}/security/login/`,
  SERVICE_PARAMETER_URL: ` ${process.env.API_BASE_URL}/parameter/`,
  SERVICE_PARAMETER_VALUES_URL: ` ${process.env.API_BASE_URL}/parameter-value/`,
  SERVICE_CONSUMER: ` ${process.env.API_BASE_URL}/my-service/`,
  PAYMENT_PROFILE_URL: ` ${process.env.API_BASE_URL}/payment-profile/`,
  PAYMENT: ` ${process.env.API_BASE_URL}/payments/`,
  PAYMENT_RECEIPT: `/upload-receipt`,
  SERVICE_SUBSCRIPTION: `${process.env.API_BASE_URL}/service-subscription/subscribe`,
  CHECK_PROMO_CODE: `${process.env.API_BASE_URL}/promo-code/`,
  EPAYMENT_STATUS: `${process.env.API_BASE_URL}/service-subscription/payment-status`,
  CONTACT_US: `${process.env.API_BASE_URL}/contact-us/`,
};
