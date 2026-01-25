import ErrorFallback from '@/components/ErrorFallback';
import { getStoredData } from '@/onBoarding/actions/onBoardingActions';
import { revalidateTag } from 'next/cache';
import PreferencesContentClient from './PreferencesContentClient';

const PreferencesContent = async ({ lng }: { lng: string }) => {
    const storedData = await getStoredData(lng);

    if (storedData.error) {
        const handleReset = async () => {
            'use server';
            revalidateTag(`stored-data`, 'days');
        };
        return (
            <ErrorFallback
                error={storedData.error}
                lng={lng}
                reset={handleReset}
            />
        );
    }
    return (
        <PreferencesContentClient storedData={storedData.data.data} lng={lng} />
    );
};

export default PreferencesContent;
