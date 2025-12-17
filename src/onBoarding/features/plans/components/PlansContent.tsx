import { getTranslation } from '@/i18n/server';
import DragAndDropCard from './DragAndDropCard';
import AiCard from './AiCard';

const PlansContent = async ({ lng }: { lng: string }) => {
    const { t } = await getTranslation(lng, 'plans');
    return (
        <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-12">
            <div className="space-y-4 text-center">
                <p className="text-2xl font-bold sm:text-6xl">
                    {t('main-title')}
                </p>
                <p className="text-sm font-semibold text-gray-700 sm:text-xl dark:text-gray-300">
                    {t('sub-title')}
                </p>
            </div>
            <div className="flex w-full flex-col items-center justify-center gap-6 sm:flex-row">
                <DragAndDropCard lng={lng} />
                <AiCard lng={lng} />
            </div>
        </div>
    );
};

export default PlansContent;
