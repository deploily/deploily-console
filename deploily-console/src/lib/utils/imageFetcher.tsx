'use client';

import { getImageUrl } from '@/actions/getImageUrl';
import { Image } from 'antd';
import { useEffect, useState } from 'react';

type Props = {
    imagePath: string;
    width: number;
    height: number;
};

export default function ImageFetcher({ imagePath, width ,height }: Props) {
    const defaultImagePath = "/images/logo_service.png";
    const [imageUrl, setImageUrl] = useState<string|undefined>(undefined); // default fallback

    useEffect(() => {
        const resolveImage = async () => {
            if (!imagePath) return;
            if (imagePath.startsWith("http")) {
                setImageUrl(imagePath);
            } else {
                try {
                    const res = await getImageUrl(imagePath);
                    if (res) {
                        setImageUrl(res);
                    }
                    else {
                        setImageUrl(defaultImagePath);
                    }
                } catch (err) {
                    setImageUrl(defaultImagePath);
                    console.error("Failed to fetch image URL", err);
                }
            }
        };

        resolveImage();
    }, [imagePath]);
    

    return  <>
{imageUrl !== undefined&&
    <Image loading= "lazy" src={imageUrl} alt={`${imagePath}`} height={height} width={width} preview={false}/>
 } </>
}
