import { getTranslation } from '@/i18n/server';
import Image from 'next/image';

import AmazonLogo from '../../../../../public/images/onBoarding/amazon.png';
import GoogleLogo from '../../../../../public/images/onBoarding/google.png';
import LenovoLogo from '../../../../../public/images/onBoarding/lenovo.png';
import MicrosoftLogo from '../../../../../public/images/onBoarding/microsoft.png';
import YoutubeLogo from '../../../../../public/images/onBoarding/youtube.png';
import AxnLogo from '../../../../../public/images/onBoarding/axn.png';


const TrustedBy = async ({ lng }: { lng: string }) => {
    const { t } = await getTranslation(lng, 'onBoarding-landing');

    const logos = [
        { src: AxnLogo, alt: 'Axn' },
        { src: LenovoLogo, alt: 'Lenovo' },
        { src: YoutubeLogo, alt: 'YouTube' },
        { src: AmazonLogo, alt: 'Amazon' },
        { src: GoogleLogo, alt: 'Google' },
        { src: MicrosoftLogo, alt: 'Microsoft' },
    ];

    return (
        <section className="py-16">
            <div>
                <p className="mb-10 text-center text-2xl  font-semibold text-gray-500 uppercase tracking-wider">
                    {t('trusted-by')}
                </p>

                <div className="mx-10 flex flex-wrap items-center justify-between gap-10 md:gap-20">
                    {logos.map((logo) => (
                        <div key={logo.alt} className="relative h-10 w-32 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                            <Image
                                src={logo.src} 
                                alt={logo.alt}
                                className="object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustedBy;