'use client';

import { useTranslation } from '@/i18n/client';
import CustomSliderButton from '@/onBoarding/components/CustomSliderButton';
import SliderInput from '@/onBoarding/components/SliderInput';
import { usePreferencesStore } from '@/onBoarding/store/preferencesStore';
import { SellingSystem } from '@/onBoarding/types';

const PreferencesColumn = ({
    sellingSystem,
    lng,
}: {
    sellingSystem: SellingSystem[];
    lng: string;
}) => {
    const { t } = useTranslation(lng, 'preferences');
    const studentsValue = usePreferencesStore((state) => state.studentsValue);
    const setStudentsValue = usePreferencesStore(
        (state) => state.setStudentsValue,
    );
    const storageValue = usePreferencesStore((state) => state.storageValue);
    const setStorageValue = usePreferencesStore(
        (state) => state.setStorageValue,
    );
    const sellingSystemValues = usePreferencesStore(
        (state) => state.sellingSystemValues,
    );
    const addSellingSystemValue = usePreferencesStore(
        (state) => state.addSellingSystemValue,
    );
    const removeSellingSystemValue = usePreferencesStore(
        (state) => state.removeSellingSystemValue,
    );
    const hasMobileApp = usePreferencesStore((state) => state.hasMobileApp);
    const setHasMobileApp = usePreferencesStore(
        (state) => state.setHasMobileApp,
    );

    const handleSellingSystemChange = (id: number) => {
        if (sellingSystemValues.includes(id)) {
            removeSellingSystemValue(id);
        } else {
            addSellingSystemValue(id);
        }
    };
    return (
        <div className="h-full w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2 xl:col-span-1 dark:border-green-800 dark:bg-green-950">
            <h3 className="mb-6 text-xl font-bold text-gray-800 dark:text-gray-100">
                {t('website-preferences')}
            </h3>
            <div className="mb-6 flex w-full items-center justify-between">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300">
                    {t('need-mobile')}{' '}
                </h3>
                <CustomSliderButton
                    value={hasMobileApp}
                    onChange={setHasMobileApp}
                    yesLabel={t('yes')}
                    noLabel={t('no')}
                    lng={lng}
                    classNames="max-w-[120px]"
                />
            </div>
            <div className="space-y-8">
                <SliderInput
                    value={studentsValue}
                    setValue={setStudentsValue}
                    lng={lng}
                    min={50}
                    max={10000}
                    step={50}
                    title="student-numbers"
                    label={lng === 'ar' ? 'عدد الطلاب' : 'Students count'}
                />
                <SliderInput
                    value={storageValue}
                    setValue={setStorageValue}
                    lng={lng}
                    min={10}
                    max={1024}
                    step={5}
                    title="platform-storage"
                    label={
                        lng === 'ar' ? 'المساحة التخزينية' : 'Platform storage'
                    }
                />
                <div className="space-y-3">
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300">
                        {t('selling-system')}
                    </h4>
                    <div className="space-y-2">
                        {sellingSystem.map((opt) => (
                            <label
                                key={opt.id}
                                className="group flex cursor-pointer items-center gap-3"
                            >
                                <input
                                    type="checkbox"
                                    checked={sellingSystemValues.includes(
                                        opt.id,
                                    )}
                                    onChange={() =>
                                        handleSellingSystemChange(opt.id)
                                    }
                                    className="size-4 rounded border-gray-400 text-green-600 focus:ring-green-500 dark:border-gray-500 dark:bg-green-900/50"
                                />
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {t('sell-by')}
                                    <span className="font-bold text-green-700 dark:text-green-400">
                                        {' '}
                                        {opt.name}
                                    </span>
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreferencesColumn;
