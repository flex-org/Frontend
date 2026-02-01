import DraggableFeature from './DraggableFeature';
import { memo } from 'react';
import { useTranslation } from '@/i18n/client';
import { Smile } from 'lucide-react';
import { useDragDropStore } from '@/onBoarding/store/DragDropStore';

const DraggableArea = ({ lng }: { lng: string }) => {
    const availableFeatures = useDragDropStore(
        (state) => state.availableFeatures,
    );
    const { t } = useTranslation(lng, 'drag-drop');
    return (
        <div className="slider col-span-4 flex h-[700px] flex-col overflow-y-auto rounded-lg border bg-white shadow-md md:col-span-2 lg:col-span-1 dark:border-green-800 dark:bg-green-950">
            <div className="border-b border-gray-300 p-4 dark:border-green-700">
                <p>{t('list')}</p>
            </div>
            {availableFeatures.length === 0 && (
                <div className="flex h-full flex-col items-center justify-center gap-2">
                    <div className="rounded-md bg-green-900 p-2 text-white">
                        <Smile className="size-10" />
                    </div>
                    <p className="text-xl">{t('picked-all')}</p>
                </div>
            )}
            <div className="flex flex-col p-4">
                {availableFeatures.map((feature) => (
                    <DraggableFeature key={feature.id} feature={feature} />
                ))}
            </div>
        </div>
    );
};
export default memo(DraggableArea);
