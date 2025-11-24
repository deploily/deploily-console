"use server";

export const getApiKey = async () => {
  return process.env.NEXT_PUBLIC_WILAYA_API_KEY;
};
