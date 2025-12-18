import { Spinner } from '@/components/ui/spinner';
import { getTranslation } from '@/i18n/server';
import DragAndDropContent from '@/onBoarding/features/build/components/DragAndDropContent';
import { Suspense } from 'react';

const Build = async ({ params }: { params: Promise<{ lng: string }> }) => {
    const { lng } = await params;
    const { t } = await getTranslation(lng, 'drag-drop');
    return (
        <div className="mt-24 px-2 sm:px-0">
            <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-12">
                <div className="space-y-4 text-center">
                    <p className="text-2xl font-bold sm:text-6xl">
                        {t('main-title')}
                    </p>
                    <p className="text-sm font-semibold text-gray-700 sm:text-xl dark:text-gray-300">
                        {t('sub-title')}
                    </p>
                </div>
                <Suspense fallback={<Spinner className="size-12" />}>
                    <DragAndDropContent lng={lng} />
                </Suspense>
            </div>
        </div>
    );
};

export default Build;
