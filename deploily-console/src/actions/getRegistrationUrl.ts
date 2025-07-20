"use server";

export const getRegistrationUrl = async (callbackUrl: string) => {

    const registrationUrl = `${process.env.KEYCLOAK_REGISTRATION_URL}&redirect_uri=${encodeURIComponent(process.env.KEYCLOAK_REDIRECT_URL || "")}&state=${encodeURIComponent(callbackUrl)}`;
    return registrationUrl;
};
