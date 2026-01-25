'use client';
import { initialPlatformData } from '@/onBoarding/types';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import DraggableArea from './DraggableArea';
import DroppableArea from './DroppableArea';
import FeatureItem from './FeatureItem';
import useDragDrop from '../hooks/useDragDrop';
import { useEffect } from 'react';
import { useDragDropStore } from '@/onBoarding/store/DragDropStore';
import BackAndForwardButtons from '@/onBoarding/components/BackAndForwardButtons';

const DragAndContentClient = ({
    lng,
    storedData,
}: {
    lng: string;
    storedData: initialPlatformData;
}) => {
    const activeItems = useDragDropStore((state) => state.activeItems);
    const initializeFromAPI = useDragDropStore(
        (state) => state.initializeFromAPI,
    );
    const addAvailableFeature = useDragDropStore(
        (state) => state.addAvailableFeature,
    );
    const availableFeatures = useDragDropStore(
        (state) => state.availableFeatures,
    );
    const { activeFeature, handleDragStart, handleDragEnd, sensors } =
        useDragDrop();

    useEffect(() => {
        if (storedData) {
            const selectedIds = storedData.selected_features.map((item) =>
                Number(item.id),
            );
            initializeFromAPI(storedData.features, selectedIds, lng);
        }
    }, [initializeFromAPI, storedData, lng]);
    const storedFeatures = activeItems.map((item) => Number(item.id));
    const finalData = { features: storedFeatures };
    return (
        <div className="space-y-2">
            <DndContext
                sensors={sensors}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <div className="grid grid-cols-4 gap-6">
                    <DraggableArea lng={lng} features={availableFeatures} />
                    <DroppableArea lng={lng} onRemove={addAvailableFeature} />
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
                disabled={!activeItems || activeItems.length === 0}
                lng={lng}
                nextPage="preferences"
                storedData={finalData}
                endPoint="features"
            />
        </div>
    );
};

export default DragAndContentClient;
