'use client';
import { useDroppable } from '@dnd-kit/core';
import { Plus, X } from 'lucide-react';
import { memo, useMemo } from 'react';
import FeatureItem from './FeatureItem';
import ToolTipComponent from '@/components/ToolTipComponent';
import { useGlobalStore } from '@/onBoarding/store/globalStore';
import { useTranslation } from '@/i18n/client';
import { Features } from '@/onBoarding/types';

const DroppableArea = ({
    lng,
    onRemove,
}: {
    lng: string;
    onRemove: (f: Features) => void;
}) => {
    const { t } = useTranslation(lng, 'drag-drop');
    const { activeItems, setActiveItems } = useGlobalStore();
    const { setNodeRef, isOver } = useDroppable({
        id: 'droppable-area',
    });
    const price = useMemo(() => {
        return activeItems.reduce((acc, item) => acc + Number(item.price), 0);
    }, [activeItems]);
    const handleRemove = (item: Features) => {
        const filteredItems = activeItems.filter((i) => i.id !== item.id);
        setActiveItems(filteredItems);
        onRemove(item);
    };
    const style = {
        minHeight: '400px',
        // height:'600px',
        width: '100%',
        border: '2px dashed #097f0d',
        padding: '20px',
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`col-span-4 rounded-lg shadow-md md:col-span-2 lg:col-span-3 ${isOver ? 'bg-green-200/40 dark:bg-green-800/40' : ''}`}
        >
            <div className="inset-x-0 border-b border-gray-300 p-4 dark:border-green-700">
                <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold sm:text-sm md:text-lg">
                        {t('chosen-features-number')}:{' '}
                        <span className="font-bold text-green-700">
                            {activeItems.length}
                        </span>
                    </p>
                    <div className="h-10 w-0.5 bg-green-800" />
                    <p className="text-xs font-semibold sm:text-sm md:text-lg">
                        {t('chosen-features-price')}:{' '}
                        <span className="font-bold text-green-700">
                            {price}
                        </span>
                    </p>
                </div>
            </div>
            {activeItems.length === 0 && (
                <div className="flex h-full w-full flex-col items-center justify-center space-y-4">
                    <div className="rounded-md bg-green-900 p-2 text-white">
                        <Plus />
                    </div>
                    <p>{t('drag-drop-here')}</p>
                </div>
            )}
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3">
                {activeItems.map((item) => (
                    <FeatureItem
                        key={item.id}
                        feature={item}
                        classNames="border p-2 border-green-400 dark:border-green-900 rounded-md relative"
                    >
                        <ToolTipComponent
                            label={lng == 'ar' ? 'ازالة ' : 'remove '}
                        >
                            <div
                                onClick={() => handleRemove(item)}
                                className={`absolute -top-2 ${lng === 'ar' ? '-left-1' : '-right-1'} cursor-pointer rounded-full bg-green-800 p-0.5`}
                            >
                                <X className="size-3 text-white" />
                            </div>
                        </ToolTipComponent>
                    </FeatureItem>
                ))}
            </div>
        </div>
    );
};

export default memo(DroppableArea);
