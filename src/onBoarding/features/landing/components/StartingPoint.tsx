import { getTranslation } from '@/i18n/server';
import { CheckCircle } from 'lucide-react';

const StartingPoint = async ({ lng }: { lng: string }) => {
    const { t } = await getTranslation(lng, 'onBoarding-landing');

    const buildFeatures = [
        t('startingPoint.build.feature1'),
        t('startingPoint.build.feature2'),
        t('startingPoint.build.feature3'),
    ];

    const aiFeatures = [
        t('startingPoint.ai.feature1'),
        t('startingPoint.ai.feature2'),
        t('startingPoint.ai.feature3'),
    ];

    return (
        <section className="w-full px-6 md:px-10 py-16 md:py-24 bg-[#e8e8e8] dark:bg-neutral-900">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                        {t('startingPoint.title')}
                    </h2>
                    <p className="mt-4 text-gray-600 dark:text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
                        {t('startingPoint.subtitle')}
                    </p>
                </div>

                {/* Cards Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {/* Build by Yourself Card */}
                    <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-neutral-700">
                        {/* Icon */}
                        <div className="w-14 h-14 bg-[#1B5E20] rounded-xl flex items-center justify-center mb-6">
                            <svg
                                className="w-7 h-7 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                />
                            </svg>
                        </div>

                        {/* Title & Description */}
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                            {t('startingPoint.build.title')}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base mb-6">
                            {t('startingPoint.build.description')}
                        </p>

                        {/* Button */}
                        <button className="w-full py-3 px-6 bg-[#1B5E20] hover:bg-[#155a1c] text-white font-semibold rounded-full transition-colors duration-200 mb-6">
                            {t('startingPoint.build.button')}
                        </button>

                        {/* Features List */}
                        <div className="space-y-3">
                            {buildFeatures.map((feature, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-[#1B5E20] flex-shrink-0" />
                                    <span className="text-gray-700 dark:text-gray-300 text-sm">
                                        {feature}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Let AI Help You Card */}
                    <div className="bg-[#1B5E20] rounded-2xl p-6 md:p-8 shadow-sm">
                        {/* Icon */}
                        <div className="w-14 h-14 bg-[#2E7D32] rounded-xl flex items-center justify-center mb-6">
                            <svg
                                className="w-7 h-7 text-white"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                            </svg>
                        </div>

                        {/* Title & Description */}
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                            {t('startingPoint.ai.title')}
                        </h3>
                        <p className="text-green-100 text-sm md:text-base mb-6">
                            {t('startingPoint.ai.description')}
                        </p>

                        {/* Button */}
                        <button className="w-full py-3 px-6 bg-white hover:bg-gray-100 text-[#1B5E20] font-semibold rounded-full transition-colors duration-200 mb-6">
                            {t('startingPoint.ai.button')}
                        </button>

                        {/* Features List */}
                        <div className="space-y-3">
                            {aiFeatures.map((feature, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />
                                    <span className="text-white text-sm">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StartingPoint;
