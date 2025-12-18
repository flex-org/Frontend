'use client';
import { Features } from '@/onBoarding/types';
import { useDraggable } from '@dnd-kit/core';
import { memo } from 'react';
import FeatureItem from './FeatureItem';

const DraggableFeature = ({
    feature,
    lng,
}: {
    feature: Features;
    lng: string;
}) => {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: feature.id,
        data: feature,
    });
    const style = {
        // transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.5 : 1,
        padding: '10px',
        marginBottom: '5px',
        cursor: 'grab',
        touchAction: 'none',
    };
    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className={`mb-3 cursor-grab rounded border border-green-200 p-4 transition-opacity dark:border-green-900 ${
                isDragging ? 'border-dashed opacity-30' : ''
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
