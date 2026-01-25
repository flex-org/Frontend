import { revalidateTag } from 'next/cache';
import DomainContentClient from './DomainContentClient';
import { getStoredData } from '@/onBoarding/actions/onBoardingActions';
import ErrorFallback from '@/components/ErrorFallback';

const DomainContent = async ({ lng }: { lng: string }) => {
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
    const { domain } = storedData.data.data;
    return <DomainContentClient selectedDomain={domain} lng={lng} />;
};

export default DomainContent;
