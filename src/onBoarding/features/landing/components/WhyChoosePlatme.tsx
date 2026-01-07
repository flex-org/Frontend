import { getTranslation } from '@/i18n/server';
import Image, { StaticImageData } from 'next/image';

import TeachMoreImage from '../../../../../public/images/onBoarding/teachMore.png';
import SimplifyImage from '../../../../../public/images/onBoarding/simplify_your_workflow.png';
import InteractiveImage from '../../../../../public/images/onBoarding/make_learning_interactive.png';
import UploadsImage from '../../../../../public/images/onBoarding/effortless_uploading_of_every_format.png';
import CustomizeImage from '../../../../../public/images/onBoarding/customize_your_look.png';

interface Benefit {
    title: string;
    description: string;
    imagePosition: 'left' | 'right';
    image: StaticImageData;
}

const WhyChoosePlatme = async ({ lng }: { lng: string }) => {
    const { t } = await getTranslation(lng, 'onBoarding-landing');

    const benefits: Benefit[] = [
        {
            title: t('whyChoose.teachMore.title'),
            description: t('whyChoose.teachMore.description'),
            imagePosition: 'left',
            image: TeachMoreImage,
        },
        {
            title: t('whyChoose.simplify.title'),
            description: t('whyChoose.simplify.description'),
            imagePosition: 'right',
            image: SimplifyImage,
        },
        {
            title: t('whyChoose.interactive.title'),
            description: t('whyChoose.interactive.description'),
            imagePosition: 'left',
            image: InteractiveImage,
        },
        {
            title: t('whyChoose.uploads.title'),
            description: t('whyChoose.uploads.description'),
            imagePosition: 'right',
            image: UploadsImage,
        },
        {
            title: t('whyChoose.customize.title'),
            description: t('whyChoose.customize.description'),
            imagePosition: 'left',
            image: CustomizeImage,
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
                            {/* Image */}
                            <div className="flex-shrink-0">
                                <div className="w-40 h-32 md:w-48 md:h-36 lg:w-52 lg:h-40 rounded-lg overflow-hidden">
                                    <Image
                                        src={benefit.image}
                                        alt={benefit.title}
                                        width={200}
                                        height={160}
                                        className="w-full h-full object-cover"
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
