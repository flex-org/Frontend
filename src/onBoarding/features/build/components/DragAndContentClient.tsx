'use client';
import { DraggedFeatures, Features } from '@/onBoarding/types';
import {
    DndContext,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import DraggableArea from './DraggableArea';
import DroppableArea from './DroppableArea';
import { useGlobalStore } from '@/onBoarding/store/globalStore';
import { useState } from 'react';
import FeatureItem from './FeatureItem';
import { toast } from 'sonner';
import { useTranslation } from '@/i18n/client';

const DragAndContentClient = ({
    features,
    lng,
}: {
    features: Features[];
    lng: string;
}) => {
    const { t } = useTranslation(lng, 'drag-drop');
    const { activeItems, addActiveItem } = useGlobalStore();
    const [activeFeature, setActiveFeature] = useState<Features | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 2,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250,
                tolerance: 5,
            },
        }),
    );
    const handleDragStart = (e: DragStartEvent) => {
        setActiveFeature(e.active.data.current as Features);
        activeItems.map((item) => {
            if (item.id === activeFeature?.id) {
                toast.warning(t('feature-already-exist'));
                return;
            }
        });
    };
    const handleDragEnd = (e: DragEndEvent) => {
        const { over } = e;
        if (!over || over.id !== 'droppable-area' || !activeFeature) {
            setActiveFeature(null);
            return;
        }
        const isAlreadyAdded = activeItems.some(
            (item) => item.id === activeFeature.id,
        );
        if (isAlreadyAdded) {
            toast.error('هذه الخاصية موجودة بالفعل');
            setActiveFeature(null);
            return null;
        }

        if (over && over.id === 'droppable-area' && activeFeature) {
            const newItem: DraggedFeatures = {
                ...activeFeature,
                instanceId: crypto.randomUUID(),
            };
            addActiveItem(newItem);
        }
        setActiveFeature(null);
    };

    return (
        <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="grid grid-cols-4 gap-6">
                <DraggableArea lng={lng} features={features} />
                <DroppableArea lng={lng} />
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
                        <FeatureItem feature={activeFeature} lng={lng} />
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
};

export default DragAndContentClient;
