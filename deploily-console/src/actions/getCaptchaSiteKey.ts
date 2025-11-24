"use server";

export const getCaptchaSiteKey = async () => {
  return process.env.GOOGLE_CAPTCHA_SITE_KEY;
};
