import { getTranslation } from '@/i18n/server';
import DomainContent from '@/onBoarding/features/domain/components/DomainContent';
import PreferencesSkeleton from '@/onBoarding/skeletons/PreferencesSkeleton';
import { Suspense } from 'react';

const DomainPage = async ({ params }: { params: Promise<{ lng: string }> }) => {
    const { lng } = await params;
    const { t } = await getTranslation(lng, 'domain');
    return (
        <div className="mt-24 px-2 pb-20 sm:px-0">
            <div className="flex flex-col items-center justify-center">
                <div className="flex w-full flex-col justify-center items-center gap-4">
                    <p className="text-3xl font-bold text-gray-900 md:text-6xl dark:text-white">
                        {t('domain-page-title')}
                    </p>
                    <p className="text-lg font-bold text-gray-900 md:text-xl dark:text-gray-300">
                        {t('domain-page-description')}
                    </p>
                </div>
                <Suspense fallback={<PreferencesSkeleton />}>
                    <DomainContent lng={lng} />
                </Suspense>
            </div>
        </div>
    );
};

export default DomainPage;
