"use server";

export const getEpaymentPermission = async () => {
  return process.env.NEXT_PUBLIC_PAYMENT_ENABLED === "true" ? true : false;
};
