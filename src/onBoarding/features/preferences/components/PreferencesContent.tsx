import ErrorFallback from '@/components/ErrorFallback';
import { getSellingSystem } from '@/onBoarding/actions/onBoardingActions';
import { revalidatePath } from 'next/cache';
import PreferencesContentClient from './PreferencesContentClient';

const PreferencesContent = async ({ lng }: { lng: string }) => {
    const sellingSystem = await getSellingSystem(lng);

    if (sellingSystem.error) {
        const handleReset = async () => {
            'use server';
            revalidatePath(`/${lng}/preferences`);
        };
        return (
            <ErrorFallback
                error={sellingSystem.error}
                lng={lng}
                reset={handleReset}
            />
        );
    }

    return <PreferencesContentClient lng={lng} sellingSystem={sellingSystem.data.data} />;
};

export default PreferencesContent;
