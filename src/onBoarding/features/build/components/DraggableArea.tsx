import { Features } from '@/onBoarding/types';
import DraggableFeature from './DraggableFeature';
import { memo } from 'react';
import { useTranslation } from '@/i18n/client';
import { Smile } from 'lucide-react';

const DraggableArea = ({
    lng,
    features,
}: {
    lng: string;
    features: Features[];
}) => {
    const { t } = useTranslation(lng, 'drag-drop');
    return (
        <div className="col-span-4 flex h-[700px] flex-col overflow-y-auto rounded-lg border bg-white shadow-md md:col-span-2 lg:col-span-1 dark:border-green-800 dark:bg-green-950 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-green-300 [&::-webkit-scrollbar-thumb]:hover:bg-green-500 dark:[&::-webkit-scrollbar-thumb]:bg-green-700 [&::-webkit-scrollbar-track]:bg-white dark:[&::-webkit-scrollbar-track]:bg-green-950">
            <div className="border-b border-gray-300 p-4 dark:border-green-700">
                <p>{t('list')}</p>
            </div>
            {features.length === 0 && (
                <div className="flex h-full flex-col items-center justify-center gap-2">
                    <div className="rounded-md bg-green-900 p-2 text-white">
                        <Smile className="size-10" />
                    </div>
                    <p className="text-xl">{t('picked-all')}</p>
                </div>
            )}
            <div className="flex flex-col p-4">
                {features.map((feature) => (
                    <DraggableFeature key={feature.id} feature={feature} />
                ))}
            </div>
        </div>
    );
};
export default memo(DraggableArea);
