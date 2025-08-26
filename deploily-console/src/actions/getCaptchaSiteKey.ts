"use server";

export const getCaptchaSiteKey = async () => {
    console.log("Retrieving CAPTCHA site key from environment variables");
    console.log("GOOGLE_CAPTCHA_SITE_KEY:", process.env.GOOGLE_CAPTCHA_SITE_KEY);


    return process.env.GOOGLE_CAPTCHA_SITE_KEY;
}
