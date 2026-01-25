import DragAndContentClient from './DragAndDropContentClient';
import { getStoredData } from '@/onBoarding/actions/onBoardingActions';
import ErrorFallback from '@/components/ErrorFallback';
import { revalidateTag } from 'next/cache';

const DragAndDropContent = async ({ lng }: { lng: string }) => {
    const storedData = await getStoredData(lng);
    if (storedData.error) {
        const retryFeatureFetch = async () => {
            'use server';
            revalidateTag(`stored-data`, 'days');
        };
        return (
            <ErrorFallback
                error={storedData.error}
                lng={lng}
                reset={retryFeatureFetch}
            />
        );
    }
    return (
        <div className="w-full">
            <DragAndContentClient storedData={storedData.data.data} lng={lng} />
        </div>
    );
};

export default DragAndDropContent;
