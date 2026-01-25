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
    const [activeFeature, setActiveFeature] = useState<Features | null>(null);
    const {
        addActiveItem,
        removeAvailableFeature,
    } = useDragDropStore();

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
    };

    const handleDragEnd = (e: DragEndEvent) => {
        const { over } = e;
        if (!over || over.id !== 'droppable-area' || !activeFeature) {
            setActiveFeature(null);
            return;
        }
        if (over && over.id === 'droppable-area' && activeFeature) {
            const newItem: DraggedFeatures = {
                ...activeFeature,
                instanceId: crypto.randomUUID(),
            };
            addActiveItem(newItem);
            removeAvailableFeature(activeFeature.id);
        }
        setActiveFeature(null);
    };

    return {
        activeFeature,
        handleDragStart,
        handleDragEnd,
        sensors,
    };
};

export default useDragDrop;
