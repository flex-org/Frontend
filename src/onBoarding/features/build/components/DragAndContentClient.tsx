'use client';
import { Features } from '@/onBoarding/types';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import DraggableArea from './DraggableArea';
import DroppableArea from './DroppableArea';
import FeatureItem from './FeatureItem';
import useDragDrop from '../hooks/useDragDrop';

const DragAndContentClient = ({
    features,
    lng,
}: {
    features: Features[];
    lng: string;
}) => {
    const {
        returnFeatureToFeaturesColumn,
        activeFeature,
        handleDragStart,
        handleDragEnd,
        sensors,
        availableFeatures,
    } = useDragDrop(lng, features);
    return (
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
                    <div
                        style={{
                            opacity: 0.8,
                            cursor: 'grabbing',
                            // transform: 'rotate(2deg)', // حركة احترافية زيادة
                        }}
                        className="shadow-xl"
                    >
                        <FeatureItem feature={activeFeature} />
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
};

export default DragAndContentClient;
