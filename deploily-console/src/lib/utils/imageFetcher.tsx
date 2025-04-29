'use client';

import { Image } from 'antd';
import { useEffect, useState } from 'react';

type Props = {
    imagePath: string;
    width: number;
    height: number;
};

export default function ImageFetcher({ imagePath, width ,height }: Props) {
    const [imageUrl, setImageUrl] = useState<string>("/images/logo_service.png"); // default fallback

    useEffect(() => {
        const resolveImage = async () => {
            if (!imagePath) return;

            if (imagePath.startsWith("http")) {
                setImageUrl(imagePath);
            } else {
                try {
                    const res = await fetch(`/api/image?imagePath=${encodeURIComponent(imagePath)}`);
                    const data = await res.json();
                    if (data?.url) {
                        setImageUrl(data.url);
                    }
                } catch (err) {
                    console.error("Failed to fetch image URL", err);
                }
            }
        };

        resolveImage();
    }, [imagePath]);
    

    return <Image src={imageUrl} alt={`${imagePath}`} height={height} width={width} preview={false}/>;
}
