"use server";

export const getImageUrl = async (imagePath?:string) => {
    if (!imagePath) {
        return undefined;
    }
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
        return undefined;
    }

    const imageUrl = `${baseUrl}/static/uploads/${imagePath}`;

    return imageUrl
}
