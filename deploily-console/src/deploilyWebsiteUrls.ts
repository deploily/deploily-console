export const BASE_URL = `${process.env.API_BASE_URL}`;

export const deploilyApiUrls = {
  SERVICE_URL: `${process.env.API_BASE_URL}/service/`,
  CART_URL: `${process.env.API_BASE_URL}/cart/`,
  CART_LINE_URL: `${process.env.API_BASE_URL}/cartline/`,
  LOGIN_URL: `${process.env.API_BASE_URL}/security/login/`,
  GENERATE_TOKEN_URL:` ${ process.env.API_BASE_URL }/consumer/cart-line/`
};
