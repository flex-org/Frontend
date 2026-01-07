import { getTranslation } from '@/i18n/server';
import Image from 'next/image';

// Temp placeholder images - replace with actual images later
const PLACEHOLDER_IMAGE = 'https://placehold.co/200x160/d1d5db/d1d5db';

interface Benefit {
    title: string;
    description: string;
    imagePosition: 'left' | 'right';
}

const WhyChoosePlatme = async ({ lng }: { lng: string }) => {
    const { t } = await getTranslation(lng, 'onBoarding-landing');

    const benefits: Benefit[] = [
        {
            title: t('whyChoose.teachMore.title'),
            description: t('whyChoose.teachMore.description'),
            imagePosition: 'left',
        },
        {
            title: t('whyChoose.simplify.title'),
            description: t('whyChoose.simplify.description'),
            imagePosition: 'right',
        },
        {
            title: t('whyChoose.interactive.title'),
            description: t('whyChoose.interactive.description'),
            imagePosition: 'left',
        },
        {
            title: t('whyChoose.uploads.title'),
            description: t('whyChoose.uploads.description'),
            imagePosition: 'right',
        },
        {
            title: t('whyChoose.customize.title'),
            description: t('whyChoose.customize.description'),
            imagePosition: 'left',
        },
    ];

    return (
        <section className="w-full px-6 md:px-10 py-16 md:py-24 bg-[#e8e8e8] dark:bg-neutral-900">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                        {t('whyChoose.title')}
                    </h2>
                    <p className="mt-4 text-gray-600 dark:text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
                        {t('whyChoose.subtitle')}
                    </p>
                </div>

                {/* Benefits List */}
                <div className="flex flex-col gap-12 md:gap-16">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className={`flex flex-col ${benefit.imagePosition === 'left'
                                    ? 'md:flex-row'
                                    : 'md:flex-row-reverse'
                                } items-center gap-6 md:gap-10`}
                        >
                            {/* Image Placeholder */}
                            <div className="flex-shrink-0">
                                <div className="w-40 h-32 md:w-48 md:h-36 lg:w-52 lg:h-40 bg-gray-300 dark:bg-neutral-700 rounded-lg overflow-hidden">
                                    <Image
                                        src={PLACEHOLDER_IMAGE}
                                        alt={benefit.title}
                                        width={200}
                                        height={160}
                                        className="w-full h-full object-cover"
                                        unoptimized
                                    />
                                </div>
                            </div>

                            {/* Text Content */}
                            <div
                                className={`flex-1 ${benefit.imagePosition === 'left'
                                        ? 'text-center md:text-left'
                                        : 'text-center md:text-left'
                                    }`}
                            >
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                    {benefit.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed">
                                    {benefit.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChoosePlatme;
