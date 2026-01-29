'use client';

import { iconsMap } from '../../build/constant';
import Empty from '@/components/Empty';
import { useTranslation } from '@/i18n/client';
import { Features } from '@/onBoarding/types';

const SelectedFeatures = ({
    features,
    lng,
}: {
    lng: string;
    features: Features[];
}) => {
    const { t } = useTranslation(lng, 'preferences');

    if (!features || features.length === 0) {
        return (
            <div className="w-full lg:col-span-3">
                <Empty
                    title={t('empty-title')}
                    description={t('empty-description')}
                />
            </div>
        );
    }

    return (
        <div className="order-2 w-full lg:order-1 lg:col-span-2 xl:col-span-3">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {features.map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-5 shadow-xs transition-all hover:scale-101 hover:shadow-md hover:shadow-gray-300 dark:border-green-800 dark:bg-green-900/20 dark:hover:shadow-green-950"
                    >
                        <div className="w-fit rounded-lg bg-green-800 p-2 text-white dark:text-green-100">
                            {iconsMap(item.icon, 'size-4')}
                        </div>
                        <div>
                            <p className="font-bold text-gray-900 dark:text-gray-100">
                                {item.name}
                            </p>
                            <p className="mt-1 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SelectedFeatures;
