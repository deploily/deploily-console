export interface EpaymentResult {
  ID: number;
  DATE: string; // ISO date string
  ACTION_CODE_DESCRIPTION: string;
  ACTION_CODE: number;
  AMOUNT: number;
  AUTH_CODE: number;
  CURRENCY: string;
  ERROR_CODE: string;
  ERROR_MESSAGE: string;
  CARD_HOLDER_NAME: string;
  EXPIRATION: string | null;
  ORDER_NUMBER: string;
  SATIM_ORDER_ID: string;
  ORDER_STATUS: number;
  APPROVAL_CODE: string | null;
  RETURNED_CODE: string | null;
  RESPONSE_CODE_DESCRIPTION: string | null;
  RESPONSE_CODE: string | null;
  UDF1: string | null;
  UDF2: string | null;
  UDF3: string | null;
  UDF4: string | null;
  UDF5: string | null;
  REGISTER_ID: string | null;
  REGISTER: string | null;
}
