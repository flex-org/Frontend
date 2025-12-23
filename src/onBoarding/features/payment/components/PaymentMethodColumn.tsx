'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/i18n/client';
import { Lock, CheckCircle2 } from 'lucide-react';
import { useState, useTransition } from 'react';
import { paymentMethods } from '../constants';
import { useDragDropStore } from '@/onBoarding/store/DragDropStore';
import { usePreferencesStore } from '@/onBoarding/store/preferencesStore';
import { useGlobalStore } from '@/onBoarding/store/globalStore';
import { createPlatform } from '@/onBoarding/actions/onBoardingActions';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';

const PaymentMethodColumn = ({ lng }: { lng: string }) => {
    const [paymentMethod, setPaymentMethod] = useState<
        'card' | 'wallet' | 'paypal'
    >('card');

    const [error, setError] = useState<Error | null>(null);
    const [isPending, startTransition] = useTransition();
    const { t } = useTranslation(lng, 'payment');
    const { activeItems } = useDragDropStore();
    const { studentsValue, storageValue } = usePreferencesStore();
    const { domain, period } = useGlobalStore();
    const { sellingSystemValues } = usePreferencesStore();

    // console.log(period);
    const handleSubmit = () => {
        const createData = {
            billing_cycle: period,
            domain,
            features: activeItems.map((item) => Number(item.id)),
            selling_system: sellingSystemValues,
            storage: storageValue,
            capacity: studentsValue,
        };
        startTransition(async () => {
            const { data, error } = await createPlatform(createData);
            if (error) {
                toast.error(t('error-create'));
                console.log(error);
            } else {
                toast.success(t('success-create'));
            }
            console.log(data);
        });
    };

    const inputClasses =
        'w-full bg-gray-50 px-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all dark:bg-green-900/20 dark:text-gray-100 dark:placeholder-gray-500 ';
    return (
        <div className="animate-in fade-in slide-in-from-bottom-2 col-span-1 h-fit rounded-3xl border border-gray-100 bg-white p-6 shadow-xl shadow-gray-200/50 duration-300 sm:col-span-2 md:col-span-3 lg:col-span-2 dark:border-green-800 dark:bg-green-950 dark:shadow-green-900/20">
            {/* Header */}
            <div className="mb-6 flex items-start justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        {t('payment-method')}
                    </h2>
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                        <Lock className="size-3" />
                        {t('secure')}
                    </div>
                </div>
                {/* Visual Logos */}
                <div className="flex gap-2 opacity-50 grayscale transition-all hover:opacity-100 hover:grayscale-0">
                    <div className="h-6 w-8 rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-6 w-8 rounded bg-gray-200 dark:bg-gray-700" />
                </div>
            </div>
            <div className="mb-8 grid grid-cols-3 gap-3">
                {paymentMethods(t).map((method) => {
                    const isActive = paymentMethod === method.id;
                    return (
                        <Button
                            key={method.id}
                            size="lg"
                            variant="outline"
                            onClick={() =>
                                setPaymentMethod(
                                    method.id as 'card' | 'wallet' | 'paypal',
                                )
                            }
                            className={`relative flex h-auto flex-col items-center justify-center gap-2 rounded-xl border py-4 text-xs font-medium transition-all sm:flex-row sm:text-sm ${
                                isActive
                                    ? 'border-green-500 bg-green-50 text-green-700 ring-1 ring-green-500 dark:border-transparent dark:bg-green-900/60 dark:text-green-400 dark:ring-green-500'
                                    : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50 dark:border-green-800/50 dark:bg-transparent dark:text-gray-400 dark:hover:bg-green-900/20'
                            }`}
                        >
                            {/* New Active Indicator: Check Icon */}
                            {isActive && (
                                <div className="absolute -top-2 -right-2 rounded-full bg-white text-green-600 dark:bg-green-950 dark:text-green-500">
                                    <CheckCircle2 className="size-4" />
                                </div>
                            )}

                            {method.isSvg ? (
                                <svg
                                    className={`size-5 ${isActive ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M7.11 8.5a4.55 4.55 0 0 1 7.42-3.47 5.09 5.09 0 0 1 1.25 5.57l-.35 1.48A2.73 2.73 0 0 1 13.06 14c-.9 0-1.48-.38-1.48-1.54l.43-3.23a.76.76 0 0 0-.76-.86h-.95" />
                                    <path d="M10.13 15.5 8.7 21.6a.78.78 0 0 1-.76.6h-.93a.5.5 0 0 1-.49-.62l2.35-9.8a1 1 0 0 1 1-.78h2.64" />
                                </svg>
                            ) : (
                                method.icon && (
                                    <method.icon
                                        className={`size-5 ${isActive ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}
                                    />
                                )
                            )}
                            <span className={isActive ? 'font-bold' : ''}>
                                {method.label}
                            </span>
                        </Button>
                    );
                })}
            </div>

            {/* Form Fields */}
            {paymentMethod === 'card' && (
                <div className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                            {t('card-number')}
                        </label>
                        <Input
                            type="text"
                            placeholder="0000 0000 0000 0000"
                            className={inputClasses}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                                {t('expire-date')}
                            </label>
                            <Input
                                type="text"
                                placeholder="MM/YY"
                                className={inputClasses}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                                CVC / CVV
                            </label>
                            <Input
                                type="text"
                                placeholder="123"
                                className={inputClasses}
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                            {t('name-on-card')}
                        </label>
                        <Input
                            type="text"
                            placeholder="ex. Amr Waheed"
                            className={inputClasses}
                        />
                    </div>
                </div>
            )}
            <div className="mt-8">
                <Button
                    size="lg"
                    variant="outline"
                    className="w-full py-6 text-base font-bold shadow-lg transition-all active:scale-[0.98] dark:text-white"
                    onClick={handleSubmit}
                    disabled={isPending}
                >
                    {isPending ? <Spinner /> : t('pay')}{' '}
                    <span className="mx-1 opacity-80">|</span> $38.00
                </Button>
                <p className="mt-3 text-center text-[10px] text-gray-400 dark:text-gray-500">
                    {t('agree-to-terms')}
                </p>
            </div>
        </div>
    );
};

export default PaymentMethodColumn;
