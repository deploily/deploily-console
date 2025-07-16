"use server";

export const getApiKey = async () => {
    return process.env.NEXT_PUBLIC_API_KEY;
}
