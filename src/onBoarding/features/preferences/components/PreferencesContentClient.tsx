'use client';
import SelectedFeatures from './SelectedFeatures';
import PreferencesColumn from './PreferencesColumn';
import { SellingSystem } from '@/onBoarding/types';
import { usePreferencesStore } from '@/onBoarding/store/preferencesStore';
import BackAndForwardButtons from '@/onBoarding/components/BackAndForwardButtons';

const PreferencesContentClient = ({
    lng,
    sellingSystem,
}: {
    lng: string;
    sellingSystem: SellingSystem[];
}) => {
    const { sellingSystemValues } = usePreferencesStore();
    return (
        <div className="flex w-full flex-col gap-4">
            <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-4">
                <SelectedFeatures lng={lng} />
                <PreferencesColumn lng={lng} sellingSystem={sellingSystem} />
            </div>
            <BackAndForwardButtons
                lng={lng}
                nextPage="domain"
                disabled={
                    !sellingSystemValues || sellingSystemValues.length === 0
                }
            />
        </div>
    );
};

export default PreferencesContentClient;
