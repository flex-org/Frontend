'use client';
import { Features } from '@/onBoarding/types';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import DraggableArea from './DraggableArea';
import DroppableArea from './DroppableArea';
import FeatureItem from './FeatureItem';
import useDragDrop from '../hooks/useDragDrop';
import { useEffect } from 'react';
import { useTranslation } from '@/i18n/client';
import { useDragDropStore } from '@/onBoarding/store/DragDropStore';
import { AlertCircle } from 'lucide-react';
import BackAndForwardButtons from '@/onBoarding/components/BackAndForwardButtons';

const DragAndContentClient = ({
    features,
    lng,
}: {
    features: Features[];
    lng: string;
}) => {
    const { activeItems, initializeAvailableFeatures } = useDragDropStore();
    const { t } = useTranslation(lng, 'drag-drop');
    useEffect(() => {
        initializeAvailableFeatures(features);
    }, [features, initializeAvailableFeatures]);
    const {
        returnFeatureToFeaturesColumn,
        activeFeature,
        handleDragStart,
        handleDragEnd,
        sensors,
        availableFeatures,
    } = useDragDrop(lng);

    return (
        <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <AlertCircle className="size-3" />
                <p className="text-xs sm:text-sm">{t('do-not-refresh')}</p>
            </div>
            <DndContext
                sensors={sensors}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <div className="grid grid-cols-4 gap-6">
                    <DraggableArea lng={lng} features={availableFeatures} />
                    <DroppableArea
                        lng={lng}
                        onRemove={returnFeatureToFeaturesColumn}
                    />
                </div>
                <DragOverlay dropAnimation={null}>
                    {activeFeature ? (
                        <div className="mb-1.5 cursor-grabbing touch-none rounded-md border border-green-400 p-2.5 opacity-100 transition-opacity dark:border-green-900">
                            <FeatureItem feature={activeFeature} />
                        </div>
                    ) : null}
                </DragOverlay>
            </DndContext>
            <BackAndForwardButtons
                disabled={!activeItems || activeItems.length===0}
                lng={lng}
                nextPage="preferences"
            />
        </div>
    );
};

export default DragAndContentClient;
