'use client';
import { Features } from '@/onBoarding/types';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import DraggableArea from './DraggableArea';
import DroppableArea from './DroppableArea';
import FeatureItem from './FeatureItem';
import useDragDrop from '../hooks/useDragDrop';
import { Button } from '@/components/ui/button';
import { useGlobalStore } from '@/onBoarding/store/globalStore';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const DragAndContentClient = ({
    features,
    lng,
}: {
    features: Features[];
    lng: string;
}) => {
    const pathname = usePathname();
    const { activeItems, initializeAvailableFeatures } = useGlobalStore();

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
        <div>
            <div className="mb-8 flex justify-between">
                {pathname !== `/${lng}/build` && (
                    <Button variant={'outline'}>Back</Button>
                )}
                <Button
                    disabled={activeItems.length === 0}
                    variant={null}
                    className="bg-green-800 text-white hover:bg-green-900 active:bg-green-950"
                >
                    Continue
                </Button>
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
        </div>
    );
};

export default DragAndContentClient;
