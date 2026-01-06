import { getTranslation } from '@/i18n/server';
import Image from 'next/image';

import IconInsights from '../../../../../public/images/onBoarding/clock.png';
import IconEngage from '../../../../../public/images/onBoarding/students.png';
import IconShare from '../../../../../public/images/onBoarding/share.png';

const PlatmeFeatures = async ({ lng }: { lng: string }) => {
    const { t } = await getTranslation(lng, 'onBoarding-landing');

    const features = [
        {
            title: t('features.insights.title'),
            description: t('features.insights.description'),
            src: IconInsights,
            alt: "Insights icon"
        },
        {
            title: t('features.engage.title'),
            description: t('features.engage.description'),
            src: IconEngage,
            alt: "Engage icon"
        },
        {
            title: t('features.share.title'),
            description: t('features.share.description'),
            src: IconShare,
            alt: "Share icon"
        }
    ];

    return (
        <section className="w-full px-10 py-24 bg-[#f8f8f8] dark:bg-neutral-950">
            <div className="">

                <div className="flex flex-col lg:flex-row justify-between items-start mb-20 gap-10">
                    <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white max-w-xl leading-[1.1]">
                        {t('features-main-title')}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl max-w-md lg:mt-4">
                        {t('features-main-description')}
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center text-center px-12 py-4 rounded-2xl
                                       bg-white dark:bg-neutral-900 
                                       border border-gray-100 dark:border-neutral-800
                                       shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                            {/* Image Container */}
                            <div className="relative w-24 h-24 mb-10 flex items-center justify-center">
                                <Image
                                    src={feature.src}
                                    alt={feature.alt}
                                    width={96}
                                    height={96}
                                    className="object-contain"
                                />
                            </div>

                            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                                {feature.title}
                            </h3>

                            <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PlatmeFeatures;