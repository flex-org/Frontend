'use client';
import SelectedFeatures from './SelectedFeatures';
import PreferencesColumn from './PreferencesColumn';
import { initialPlatformData } from '@/onBoarding/types';
import { usePreferencesStore } from '@/onBoarding/store/preferencesStore';
import BackAndForwardButtons from '@/onBoarding/components/BackAndForwardButtons';
import { useEffect, useMemo } from 'react';

const PreferencesContentClient = ({
    storedData,
    lng,
}: {
    storedData: initialPlatformData;
    lng: string;
}) => {
    const {
        selected_selling_systems,
        mobile_app,
        capacity,
        storage,
        selected_features,
        selling_systems,
    } = storedData;

    const sellingSystemValues = usePreferencesStore(
        (state) => state.sellingSystemValues,
    );
    const storageValue = usePreferencesStore((state) => state.storageValue);
    const studentsValue = usePreferencesStore((state) => state.studentsValue);
    const hasMobileApp = usePreferencesStore((state) => state.hasMobileApp);
    const initializeFromApi = usePreferencesStore(
        (state) => state.initializeFromApi,
    );

    const finalData = useMemo(
        () => ({
            selling_system: sellingSystemValues,
            storage: storageValue,
            capacity: studentsValue,
            mobile_app: hasMobileApp,
        }),
        [sellingSystemValues, storageValue, studentsValue, hasMobileApp],
    );
    useEffect(() => {
        const selectedIds = selected_selling_systems
            ? selected_selling_systems.map((item) => item.id)
            : [];
        initializeFromApi(selectedIds, mobile_app, capacity, storage);
    }, [
        initializeFromApi,
        selected_selling_systems,
        mobile_app,
        capacity,
        storage,
    ]);

    return (
        <div className="flex w-full flex-col gap-4">
            <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-4">
                <SelectedFeatures features={selected_features} lng={lng} />
                <PreferencesColumn lng={lng} sellingSystem={selling_systems} />
            </div>
            <BackAndForwardButtons
                lng={lng}
                nextPage="domain"
                disabled={
                    !sellingSystemValues || sellingSystemValues.length === 0
                }
                storedData={finalData}
                endPoint="systems"
            />
        </div>
    );
};

export default PreferencesContentClient;
