import { Features } from '@/onBoarding/types';
import DraggableFeature from './DraggableFeature';
import { memo } from 'react';
import { useTranslation } from '@/i18n/client';

const DraggableArea = ({
    lng,
    features,
}: {
    lng: string;
    features: Features[];
}) => {
    const { t } = useTranslation(lng, 'drag-drop');
    return (
        <div className="col-span-4 flex flex-col rounded-lg border bg-white shadow-md md:col-span-2 lg:col-span-1 dark:border-green-800 dark:bg-green-950">
            <div className="border-b border-gray-300 p-4 dark:border-green-700">
                <p>{t('list')}</p>
            </div>
            <div className="flex flex-col p-4">
                {features.map((feature) => (
                    <DraggableFeature
                        lng={lng}
                        key={feature.id}
                        feature={feature}
                    />
                ))}
            </div>
        </div>
    );
};
export default memo(DraggableArea);
