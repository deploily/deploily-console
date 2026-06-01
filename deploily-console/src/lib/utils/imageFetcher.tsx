'use client';

import { Image } from 'antd';

type Props = {
    imagePath?: string;
    width: number;
    height: number;
};

export default function ImageFetcher({ imagePath, width, height }: Props) {
    
    const defaultImagePath = "/images/logo_service.png";
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    const imageUrl = `${baseUrl}/static/uploads/${imagePath}`;

    return <>
        {imageUrl !== undefined &&
            <Image loading="lazy" src={imagePath ? imageUrl : defaultImagePath} alt={`${imagePath}`} height={height} width={width} preview={false} />
        } </>
}
