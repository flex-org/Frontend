'use client';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';
import AboNawaf from '../../../../../public/images/onBoarding/abo-nawaf.webp';

const HeroImage = () => {
    const isLarge = useMediaQuery({ minWidth: 1024 });
    if (!isLarge) return null;
    return (
        <div className="col-span-1">
            <Image
                src={AboNawaf}
                sizes="33vw"
                alt="landing-image"
                placeholder="blur"
                priority={true}
                className="object-cover"
                quality={75}
            />
        </div>
    );
};

export default HeroImage;
