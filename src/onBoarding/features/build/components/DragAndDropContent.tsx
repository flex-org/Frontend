import DragAndContentClient from './DragAndDropContentClient';
import { getFeatures } from '@/onBoarding/actions/onBoardingActions';
import ErrorFallback from '@/components/ErrorFallback';
import { revalidatePath } from 'next/cache';

const DragAndDropContent = async ({ lng }: { lng: string }) => {
    const features = await getFeatures(lng);
    if (features.error) {
        const handleReset = async () => {
            'use server';
            revalidatePath(`/${lng}/build`);
        };
        return (
            <ErrorFallback
                error={features.error}
                lng={lng}
                reset={handleReset}
            />
        );
    }
    return (
        <div className="w-full">
            <DragAndContentClient features={features.data.data} lng={lng} />
        </div>
    );
};

export default DragAndDropContent;
