'use client';
import { Features } from '@/onBoarding/types';
import { useDraggable } from '@dnd-kit/core';
import { memo } from 'react';
import FeatureItem from './FeatureItem';

// the ghost effect
const DraggableFeature = ({ feature }: { feature: Features }) => {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: feature.id,
        data: feature,
    });

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            className={`mb-1.5 cursor-grab touch-none rounded-md border border-green-400 p-2.5 transition-opacity dark:border-green-900 ${
                isDragging
                    ? 'border border-green-200 opacity-50'
                    : 'opacity-100'
            }`}
        >
            <FeatureItem
                DragBox={true}
                feature={feature}
                classNames="relative"
            />
        </div>
    );
};

export default memo(DraggableFeature);
