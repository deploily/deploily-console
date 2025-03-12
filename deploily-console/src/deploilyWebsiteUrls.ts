export const BASE_URL = `${process.env.API_BASE_URL}`;
export const IMAGES_URL = `${process.env.BASE_URL}/static/uploads/`;
export const deploilyApiUrls = {
  SERVICE_URL: `${process.env.API_BASE_URL}/service/`,
  SERVICE_PLAN_URL: `${process.env.API_BASE_URL}/service-plan`,
  My_SERVICE_URL: `${process.env.API_BASE_URL}/my-service/`,
  CART_URL: `${process.env.API_BASE_URL}/cart/`,
  CART_LINE_URL: `${process.env.API_BASE_URL}/cart-line/`,
  MY_FAVORITE_URL: `${process.env.API_BASE_URL}/my-favorites/`,
  POST_FAVORITE_SERVICE_URL: `${process.env.API_BASE_URL}/my-favorites-service/`,
  SUPPORT_TICKET_URL: `${process.env.API_BASE_URL}/support-ticket/`,
  LOGIN_URL: `${process.env.API_BASE_URL}/security/login/`,
  SERVICE_PARAMETER_URL: ` ${process.env.API_BASE_URL }/parameter/`,
  SERVICE_PARAMETER_VALUES_URL: ` ${process.env.API_BASE_URL }/parameter-value/`
};
