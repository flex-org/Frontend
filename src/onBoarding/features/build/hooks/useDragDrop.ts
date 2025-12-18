import { useTranslation } from '@/i18n/client';
import { useGlobalStore } from '@/onBoarding/store/globalStore';
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
import { toast } from 'sonner';

const useDragDrop = (lng: string, features: Features[]) => {
    const [activeFeature, setActiveFeature] = useState<Features | null>(null);
    const [availableFeatures, setAvailableFeatures] =
        useState<Features[]>(features);
    const { activeItems, addActiveItem } = useGlobalStore();
    const { t } = useTranslation(lng, 'drag-drop');
    
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
        const isAlreadyAdded = activeItems.some(
            (item) => item.id === activeFeature.id,
        );
        if (isAlreadyAdded) {
            toast.error(t('feature-already-exist'));
            setActiveFeature(null);
            return null;
        }
        if (over && over.id === 'droppable-area' && activeFeature) {
            const newItem: DraggedFeatures = {
                ...activeFeature,
                instanceId: crypto.randomUUID(),
            };
            addActiveItem(newItem);
            setAvailableFeatures((prev) =>
                prev.filter((f) => f.id !== activeFeature.id),
            );
        }
        setActiveFeature(null);
    };

    const returnFeatureToFeaturesColumn = (feature: Features) => {
        setAvailableFeatures((prev) => [...prev, feature]);
    };

    return {
        returnFeatureToFeaturesColumn,
        activeFeature,
        handleDragStart,
        handleDragEnd,
        sensors,
        availableFeatures,
    };
};

export default useDragDrop;
