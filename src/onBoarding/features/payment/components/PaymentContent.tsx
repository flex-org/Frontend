import {
    getDynamicFeatures,
    getStoredData,
} from '@/onBoarding/actions/onBoardingActions';
import PaymentDetailsColumn from './PaymentDetailsColumn';
import PaymentMethodColumn from './PaymentMethodColumn';
import { revalidatePath } from 'next/cache';
import ErrorFallback from '@/components/ErrorFallback';
import BackAndForwardButtons from '@/onBoarding/components/BackAndForwardButtons';

const PaymentContent = async ({ lng }: { lng: string }) => {
    const [storedData, getDynamicCached] = await Promise.all([
        getStoredData(lng),
        getDynamicFeatures(lng),
    ]);
    if (storedData.error || getDynamicCached.error) {
        const retryFeatureFetch = async () => {
            'use server';
            revalidatePath(`/${lng}/payment`);
        };
        return (
            <ErrorFallback
                error={
                    storedData.error ||
                    getDynamicCached.error || {
                        message: 'An unknown error occurred',
                    }
                }
                lng={lng}
                reset={retryFeatureFetch}
            />
        );
    }
    return (
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            <PaymentDetailsColumn
                dynamicData={getDynamicCached.data.data}
                finalData={storedData.data.data}
                lng={lng}
            />
            <PaymentMethodColumn lng={lng} />
            <BackAndForwardButtons lng={lng} />
        </div>
    );
};

export default PaymentContent;
