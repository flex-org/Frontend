'use client';

import { useTranslation } from '@/i18n/client';
import CustomSliderButton from '@/onBoarding/components/CustomSliderButton';
import { dynamicDataProps, initialPlatformData } from '@/onBoarding/types';
import {
    Check,
    Database,
    Globe,
    Users,
    ShieldCheck,
    ShoppingCart,
    Smartphone,
    CircleCheck,
    CircleX,
} from 'lucide-react';
import { useState } from 'react';

const PaymentDetailsColumn = ({
    lng,
    finalData,
    dynamicData,
}: {
    lng: string;
    finalData: initialPlatformData;
    dynamicData: dynamicDataProps;
}) => {
    const { t } = useTranslation(lng, 'payment');
    const [isYearly, setIsYearly] = useState(false);

    const activeItems = finalData.selected_features || [];
    const sellingSystems = finalData.selected_selling_systems || [];
    const studentsCount = finalData.capacity;
    const storageCount = finalData.storage;
    const hasMobileApp = finalData.mobile_app;
    const domain = finalData.domain;

    const featuresPrices = activeItems.reduce(
        (acc, item) => acc + Number(item.price),
        0,
    );
    const mobileAppPrice = dynamicData.mobile_app.price;
    const studentsPrice = dynamicData.capacity.price * studentsCount;
    const storagePrice = dynamicData.storage.price * storageCount;

    const totalBeforeDiscount =
        Number(mobileAppPrice) +
        Number(studentsPrice) +
        Number(storagePrice) +
        Number(featuresPrices);

    const discount = isYearly ? totalBeforeDiscount * 0.2 : 0;
    const total = totalBeforeDiscount - discount;

    const handlePlanChange = () => {
        if (isYearly) {
            setIsYearly(false);
        } else {
            setIsYearly(true);
        }
    };
    return (
        <div className="animate-in fade-in slide-in-from-top-2 relative col-span-1 h-fit overflow-hidden rounded-3xl border border-green-100 bg-white tracking-widest shadow-xl shadow-green-900/5 duration-300 sm:col-span-2 md:col-span-3 lg:col-span-3 dark:border-green-800 dark:bg-linear-to-r dark:from-neutral-950 dark:to-green-950 dark:shadow-green-900/20">
            {/* Top Green Bar */}
            <div className="absolute top-0 left-0 h-2 w-full bg-linear-to-r from-green-500 to-green-700" />

            {/* Header Section */}
            <div className="space-y-6 p-6 pb-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {t('platform-summary')}
                    </h2>
                </div>

                {/* Toggle (Green Themed) */}
                <CustomSliderButton
                    lng={lng}
                    onChange={handlePlanChange}
                    value={isYearly}
                    yesLabel={t('pay-yearly')}
                    noLabel={t('pay-monthly')}
                    classNames="w-[70%] mx-auto h-12"
                    payment={true}
                    buttonsClassNames="py-2"
                />
            </div>

            <div className="px-6">
                {/* 1. Resources Grid (Green Cards) */}
                <div className="mb-6 grid grid-cols-2 gap-3">
                    {/* Students Card */}
                    <div className="flex items-center justify-between rounded-2xl border border-green-50 bg-green-50/50 p-4 dark:border-green-800/50 dark:bg-green-900/20">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-green-600/80 uppercase dark:text-green-400">
                                <Users className="size-4" />
                                {t('students')}
                            </div>
                            <span className="text-xl font-bold text-gray-900 dark:text-white">
                                {studentsCount}
                            </span>
                        </div>
                        <span className="rounded-md bg-green-200/60 p-1 dark:bg-green-600/40">
                            {studentsPrice}$
                        </span>
                    </div>
                    {/* Storage Card */}
                    <div className="flex items-center justify-between rounded-2xl border border-green-50 bg-green-50/50 p-4 dark:border-green-800/50 dark:bg-green-900/20">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-green-600/80 uppercase dark:text-green-400">
                                <Database className="size-4" />
                                {t('storage')}
                            </div>
                            <span className="text-xl font-bold text-gray-900 dark:text-white">
                                {storageCount}
                                <span className="text-sm font-medium text-gray-500 dark:text-green-200/50">
                                    {t('gb')}
                                </span>
                            </span>
                        </div>
                        <span className="rounded-md bg-green-200/60 p-1 dark:bg-green-600/40">
                            {storagePrice}$
                        </span>
                    </div>
                </div>

                {/* 2. Domain (Verified Bar Style) */}
                <div className="mb-6 flex items-center gap-3 rounded-xl border border-green-200 bg-white p-3 shadow-sm ring-1 ring-green-50 dark:border-green-800 dark:bg-green-950 dark:ring-green-900">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400">
                        <Globe className="size-5" />
                    </div>
                    <div className="flex flex-col overflow-hidden">
                        <span className="text-xs font-bold tracking-wider text-gray-400 uppercase dark:text-green-200/50">
                            {t('platform-link')}
                        </span>
                        <span
                            className="truncate text-sm font-bold text-gray-900 dark:text-green-50"
                            dir="ltr"
                        >
                            <span className="text-green-600 dark:text-green-400">
                                https://
                            </span>
                            {domain}.platme.com
                        </span>
                    </div>
                </div>

                {/* 3. Selling Systems Section (New!) */}
                {sellingSystems.length > 0 && (
                    <div className="mb-6">
                        <h3 className="mb-3 flex items-center gap-2 text-xs font-bold tracking-wider text-gray-400 uppercase dark:text-green-200/50">
                            <ShoppingCart className="size-3.5" />
                            {t('selling-systems')}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {sellingSystems.map((sys) => (
                                <span
                                    key={sys.id}
                                    className="inline-flex items-center rounded-md bg-green-50 px-2.5 py-1.5 text-xs font-medium text-green-700 ring-1 ring-green-600/20 dark:bg-green-900/40 dark:text-green-300 dark:ring-green-500/30"
                                >
                                    {sys.name}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
                <div className="mb-6">
                    <h3 className="mb-3 flex items-center gap-2 text-xs font-bold tracking-wider text-gray-400 uppercase dark:text-green-200/50">
                        <Smartphone className="size-3.5" />
                        {t('mobile-app')}
                    </h3>
                    <div
                        className={`flex w-full flex-wrap items-center justify-between rounded-md p-2.5 text-sm font-medium ${hasMobileApp ? 'bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-900/40 dark:text-green-300 dark:ring-green-500/30' : 'bg-gray-50 text-gray-500 ring-gray-600/20 dark:bg-gray-900/40 dark:text-gray-400 dark:ring-gray-500/30'} ring-1`}
                    >
                        <span className="inline-flex items-center gap-2">
                            {hasMobileApp ? t('mobile') : t('no-mobile')}
                            {hasMobileApp ? (
                                <CircleCheck size={15} />
                            ) : (
                                <CircleX size={15} />
                            )}
                        </span>
                        <span>{mobileAppPrice}$</span>
                    </div>
                </div>

                {/* 4. Features List */}
                <div className="mb-6">
                    <h3 className="mb-3 flex items-center gap-2 text-xs font-bold tracking-wider text-gray-400 uppercase dark:text-green-200/50">
                        <Check className="size-3.5" />
                        {t('selected-features')}
                    </h3>
                    <div className="space-y-3 rounded-xl bg-gray-50/50 p-4 dark:bg-green-900/10">
                        {activeItems.length > 0 ? (
                            activeItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="group flex items-center justify-between text-sm"
                                >
                                    <span className="font-medium text-gray-700 transition-colors group-hover:text-green-700 dark:text-gray-300 dark:group-hover:text-green-300">
                                        {item.name}
                                    </span>
                                    <span className="font-mono font-medium text-gray-400 dark:text-gray-500">
                                        {item.price}$
                                    </span>
                                </div>
                            ))
                        ) : (
                            <span className="text-sm text-gray-400 italic">
                                {t('no-features')}
                            </span>
                        )}
                    </div>
                </div>

                <div className="my-6 border-t border-dashed border-gray-200 dark:border-green-800" />

                <div className="space-y-3 pb-6">
                    <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-green-200/60">
                        <span>{t('subtotal')}</span>
                        <span>${totalBeforeDiscount.toFixed(2)}</span>
                    </div>

                    {isYearly && (
                        <div className="flex justify-between text-sm font-medium text-green-600 dark:text-green-400">
                            <span>{t('discount')} (20%)</span>
                            <span>-${discount.toFixed(2)}</span>
                        </div>
                    )}

                    <div className="flex items-end justify-between pt-2">
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-900 dark:text-white">
                                {t('total-due')}
                            </span>
                            <span className="text-xs text-green-600/80 dark:text-green-400/80">
                                {t('secure-checkout')}
                            </span>
                        </div>
                        <div className="text-right">
                            <span className="block text-3xl font-extrabold text-green-700 dark:text-green-400">
                                ${total.toFixed(2)}
                            </span>
                            <span className="text-xs font-medium text-gray-400 dark:text-green-200/40">
                                / {isYearly ? t('year') : t('month')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center gap-2 bg-green-50 py-3 text-xs font-semibold text-green-700 dark:bg-green-900 dark:text-green-300">
                <ShieldCheck className="size-3.5" />
                {t('encrypted-payment')}
            </div>
        </div>
    );
};

export default PaymentDetailsColumn;
