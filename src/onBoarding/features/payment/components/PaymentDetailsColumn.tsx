'use client';
import { useTranslation } from '@/i18n/client';
import { useDragDropStore } from '@/onBoarding/store/DragDropStore';
import { useGlobalStore } from '@/onBoarding/store/globalStore';
import { usePreferencesStore } from '@/onBoarding/store/preferencesStore';
import { useEffect } from 'react';

const PaymentDetailsColumn = ({ lng }: { lng: string }) => {
    const { t } = useTranslation(lng, 'payment');
    const { activeItems } = useDragDropStore();
    const { studentsValue, storageValue } = usePreferencesStore();
    const { domain, isYearly, toggleYearly, setPeriod } = useGlobalStore();

    useEffect(() => {
        if (isYearly) {
            setPeriod('yearly');
        } else {
            setPeriod('monthly');
        }
    }, [isYearly, setPeriod]);
    return (
        <div className="animate-in fade-in slide-in-from-bottom-2 col-span-1 h-fit overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl shadow-gray-200/50 transition-all duration-300 sm:col-span-2 md:col-span-3 lg:col-span-3 dark:border-green-800 dark:bg-green-950 dark:shadow-green-900/20">
            {/* Header Section */}
            <div className="bg-gray-50/50 p-6 dark:bg-green-900/20">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-green-50">
                        {t('payment-details')}
                    </h2>

                    {/* Toggle Button Container */}
                    <div className="flex items-center gap-3 rounded-full bg-white px-3 py-1.5 shadow-sm ring-1 ring-gray-200 dark:bg-green-900 dark:ring-green-800">
                        <span
                            className={`text-xs font-medium ${isYearly ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-green-300/70'}`}
                        >
                            {t('pay-yearly')}{' '}
                            <span className="hidden sm:inline">
                                ({t('off')})
                            </span>
                        </span>
                        <button
                            type="button"
                            title="pay yearly"
                            onClick={toggleYearly}
                            className={`relative h-6 w-11 cursor-pointer rounded-full transition-colors duration-300 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none dark:focus:ring-offset-green-900 ${
                                isYearly
                                    ? 'bg-green-600'
                                    : 'bg-gray-300 dark:bg-green-800'
                            }`}
                        >
                            <span
                                className={`absolute top-0.5 left-0.5 inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition duration-300 ease-in-out ${
                                    isYearly ? 'translate-x-5' : 'translate-x-0'
                                }`}
                            />
                        </button>
                    </div>
                </div>
            </div>

            <div className="p-6">
                {/* Features List */}
                <div className="mb-6">
                    <h3 className="mb-4 text-sm font-semibold tracking-wider text-gray-500 uppercase dark:text-green-400/80">
                        {t('features')}
                    </h3>
                    <div className="space-y-3">
                        {activeItems.length > 0 ? (
                            activeItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-start justify-between text-sm"
                                >
                                    <div className="flex flex-col">
                                        <span className="font-medium text-gray-700 dark:text-green-100">
                                            {item.name}
                                        </span>
                                    </div>
                                    <span className="font-semibold text-gray-900 dark:text-green-50">
                                        {item.price}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-400 italic dark:text-green-400/50">
                                {t('no-selected')}
                            </p>
                        )}
                    </div>
                </div>

                {/* Divider with Green Tint */}
                <div className="my-6 h-px bg-gray-100 dark:bg-green-800/50" />

                {/* Preferences List */}
                <div className="mb-6">
                    <h3 className="mb-4 text-sm font-semibold tracking-wider text-gray-500 uppercase dark:text-green-400/80">
                        {t('preferences')}
                    </h3>
                    <div className="space-y-3 text-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600 dark:text-green-200/80">
                                {t('number-of-students')}{' '}
                                <span className="font-bold text-gray-900 dark:text-green-100">
                                    {studentsValue}
                                </span>
                            </span>
                            <span className="font-semibold text-gray-900 dark:text-green-50">
                                $14.00
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600 dark:text-green-200/80">
                                {t('storage')}:{' '}
                                <span className="font-bold text-gray-900 dark:text-green-100">
                                    {storageValue}
                                </span>{' '}
                                GB
                            </span>
                            <span className="font-semibold text-gray-900 dark:text-green-50">
                                $15.00
                            </span>
                        </div>
                    </div>
                </div>

                {/* Domain Section - Green Card Style */}
                <div className="mb-6 rounded-xl border border-green-100 bg-green-50/50 p-4 dark:border-green-700/50 dark:bg-green-900/40">
                    <div className="flex items-center justify-between">
                        <span className="font-medium text-green-800 dark:text-green-300">
                            {t('domain')}
                        </span>
                        <span
                            className="font-bold text-green-700 dark:text-green-100"
                            dir="ltr"
                        >
                            {domain}.platme.com
                        </span>
                    </div>
                </div>
                <div className="my-6 h-px bg-gray-100 dark:bg-green-800/50" />
                {/* Totals Section */}
                <div className="space-y-3">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-green-200/70">
                        <span>{t('subtotal')}</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                            $49.00
                        </span>
                    </div>
                    <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                        <span>{t('discount')} (20%)</span>
                        <span className="font-medium">-$11.00</span>
                    </div>

                    <div className="mt-4 flex items-end justify-between border-t border-dashed border-gray-200 pt-4 dark:border-green-800">
                        <span className="text-lg font-bold text-gray-900 dark:text-green-50">
                            {t('total')}
                        </span>
                        <div className="flex flex-col items-end">
                            <span className="text-2xl font-extrabold text-green-600 dark:text-green-400">
                                $38.00
                            </span>
                            <span className="text-xs text-gray-400 dark:text-green-400/60">
                                {isYearly ? '/ year' : '/ month'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Color Bar */}
            <div className="h-1.5 w-full bg-linear-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-400" />
        </div>
    );
};

export default PaymentDetailsColumn;
