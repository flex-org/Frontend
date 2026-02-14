'use client';

import { useState } from 'react';
import CustomSliderButton from '@/onBoarding/components/CustomSliderButton';
import { ShieldCheck } from 'lucide-react';
import { useTranslation } from '@/i18n/client';

type PaymentCalculatorProps = {
    lng: string;
    totalBeforeDiscount: number;
    children: React.ReactNode;
};

export const PaymentCalculator = ({
    lng,
    totalBeforeDiscount,
    children,
}: PaymentCalculatorProps) => {
    const { t } = useTranslation(lng, 'payment');
    const [isYearly, setIsYearly] = useState(false);

    const discount = isYearly ? totalBeforeDiscount * 0.2 : 0;
    const total = totalBeforeDiscount - discount;

    return (
        <div className="relative col-span-1 h-fit overflow-hidden rounded-3xl border border-green-100 bg-white tracking-widest shadow-xl shadow-green-900/5 duration-300 sm:col-span-2 md:col-span-3 lg:col-span-3 dark:border-green-800 dark:bg-linear-to-r dark:from-neutral-950 dark:to-green-950 dark:shadow-green-900/20">
            <div className="absolute top-0 left-0 h-2 w-full bg-linear-to-r from-green-500 to-green-700" />
            <div className="space-y-6 p-6 pb-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {t('platform-summary')}
                    </h2>
                </div>
                <CustomSliderButton
                    lng={lng}
                    onChange={() => setIsYearly(!isYearly)}
                    value={isYearly}
                    yesLabel={t('pay-yearly')}
                    noLabel={t('pay-monthly')}
                    classNames="w-[100%] sm:w-[70%] mx-auto h-12"
                    payment={true}
                    buttonsClassNames="py-2"
                />
            </div>

            <div className="px-6">
                {children}
                <div className="my-6 border-t border-dashed border-gray-200 dark:border-green-800" />
                <div className="space-y-3 pb-6">
                    <div className="flex justify-between text-sm font-bold text-gray-600 dark:text-green-200/50">
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
                            <span className="text-xs font-bold text-gray-600 dark:text-green-200/40">
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
