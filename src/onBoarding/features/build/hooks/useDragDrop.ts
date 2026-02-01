import { useDragDropStore } from '@/onBoarding/store/DragDropStore';
import { DraggedFeatures, Features } from '@/onBoarding/types';
import {
    DragEndEvent,
    DragStartEvent,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { useState } from 'react';

const useDragDrop = () => {
    const [draggedFeature, setDraggedFeature] = useState<Features | null>(null);
    const { addActiveItem, removeAvailableFeature } = useDragDropStore();

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
        setDraggedFeature(e.active.data.current as Features);
    };

    const handleDragEnd = (e: DragEndEvent) => {
        const { over } = e;
        if (!over || over.id !== 'droppable-area' || !draggedFeature) {
            setDraggedFeature(null);
            return;
        }
        if (over && over.id === 'droppable-area' && draggedFeature) {
            const newItem: DraggedFeatures = {
                ...draggedFeature,
                instanceId: crypto.randomUUID(),
            };
            addActiveItem(newItem);
            removeAvailableFeature(draggedFeature.id);
        }
        setDraggedFeature(null);
    };

    return {
        draggedFeature,
        handleDragStart,
        handleDragEnd,
        sensors,
    };
};

export default useDragDrop;
