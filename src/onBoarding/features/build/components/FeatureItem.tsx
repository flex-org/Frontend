import { Grip } from 'lucide-react';
import { iconsMap } from '../constant';
import { Features } from '@/onBoarding/types';
import { cn } from '@/utils/cn';
import { ReactNode } from 'react';

const FeatureItem = ({
    feature,
    classNames,
    children,
    DragBox,
}: {
    feature: Features;
    classNames?: string;
    children?: ReactNode;
    DragBox?: boolean;
}) => {
    // const { activeItems } = useGlobalStore();
    // const isSelected = activeItems.some((item) => item.id === feature.id);
    return (
        <div className={cn('flex items-center gap-2', classNames)}>
            <div className="flex items-center gap-2">
                {DragBox && (
                    <Grip className="text-gray-400 dark:text-gray-600" />
                )}
                <div className="rounded-md bg-green-800 p-2 text-sm text-white">
                    {iconsMap(feature.icon, 'size-5 ')}
                </div>
            </div>
            <div className="">
                <p> {feature.name || 'Feature Item'}</p>
                <p className="b text-xs text-gray-500 dark:text-gray-400">
                    {feature.description}
                </p>
            </div>
            {/* {isSelected && DragBox && (
                <div
                    className={`absolute top-1 ${lng === 'ar' ? 'left-0' : 'right-0'}`}
                >
                    <CheckCircle className="size-3 text-green-500" />
                </div>
            )} */}
            {children}
        </div>
    );
};

export default FeatureItem;
