import { getTranslation } from '@/i18n/server';

const PlatmeNumbers = async ({ lng }: { lng: string }) => {
    const { t } = await getTranslation(lng, 'onBoarding-landing');

    const stats = [
        { label: t('partners'), value: '20' },
        { label: t('courses'), value: '600' },
        { label: t('instructors'), value: '100' },
        { label: t('students'), value: '12000' },
    ];

    return (
        <section className="relative w-full px-10 py-32 text-gray-600 dark:bg-neutral-950 overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
                <h2 className="text-[12vw] font-bold whitespace-nowrap leading-none text-gray-900/30 mt-[-260]">
                    {t('numbers-bg-text')}
                </h2>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center justify-center px-6 py-12 rounded-[40px]
                                       backdrop-blur-sm
                                       border border-white/20
                                       shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]"
                        >
                            <p className="text-gray-500 text-xl font-medium mb-6 text-center">
                                {stat.label}
                            </p>
                            <span className="text-5xl font-extrabold text-black dark:text-white">
                                {stat.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PlatmeNumbers;