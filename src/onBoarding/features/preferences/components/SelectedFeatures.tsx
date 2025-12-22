'use client';

import { useDragDropStore } from '@/onBoarding/store/DragDropStore';
import { iconsMap } from '../../build/constant';
import Empty from '@/components/Empty';
import { useTranslation } from '@/i18n/client';

const SelectedFeatures = ({ lng }: { lng: string }) => {
    const { t } = useTranslation(lng, 'preferences');
    const { activeItems } = useDragDropStore();

    if (!activeItems || activeItems.length === 0) {
        return (
            <div className="w-full lg:col-span-3">
                <Empty title={t('empty-title')} description={t('empty-description')} />
            </div>
        );
    }

    return (
        <div className="w-full lg:col-span-3">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {activeItems.map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-green-800 dark:bg-green-900/20"
                    >
                        <div className="w-fit rounded-lg bg-green-800 p-2 text-white dark:text-green-100">
                            {iconsMap(item.icon, 'size-4')}
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 dark:text-gray-100">
                                {item.name}
                            </h4>
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
