// components/summary/FeaturesSummary.tsx
import { getTranslation } from '@/i18n/server';
import { Features, SellingSystem } from '@/onBoarding/types';
import {
    Check,
    ShoppingCart,
    Smartphone,
    CircleCheck,
    CircleX,
} from 'lucide-react';

export const SellingSystemsSummary = async ({
    systems,
    lng,
}: {
    systems: SellingSystem[];
    lng: string;
}) => {
    const { t } = await getTranslation(lng, 'payment');
    if (!systems?.length) return null;
    return (
        <div className="mb-6">
            <h3 className="mb-3 flex items-center gap-2 text-xs font-bold tracking-wider text-gray-600 uppercase dark:text-green-200">
                <ShoppingCart className="size-3.5" />
                {t('selling-systems')}
            </h3>
            <div className="flex flex-wrap gap-2">
                {systems.map((sys: SellingSystem) => (
                    <span
                        key={sys.id}
                        className="inline-flex items-center rounded-md bg-green-50 px-2.5 py-1.5 text-xs font-bold text-green-700 ring-1 ring-green-600/20 dark:bg-green-900/40 dark:text-green-300 dark:ring-green-500/30"
                    >
                        {sys.name}
                    </span>
                ))}
            </div>
        </div>
    );
};

export const MobileAppSummary = async ({
    hasApp,
    price,
    lng,
}: {
    hasApp: boolean;
    price: number;
    lng: string;
}) => {
    const { t } = await getTranslation(lng, 'payment');
    return (
        <div className="mb-6">
            <h3 className="mb-3 flex items-center gap-2 text-xs font-bold tracking-wider text-gray-600 uppercase dark:text-green-200">
                <Smartphone className="size-3.5" />
                {t('mobile-app')}
            </h3>
            <div
                className={`flex w-full flex-wrap items-center justify-between rounded-md p-2.5 text-sm font-bold ${hasApp ? 'bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-900/40 dark:text-green-300 dark:ring-green-500/30' : 'bg-gray-50 text-gray-500 ring-gray-600/20 dark:bg-gray-900/40 dark:text-gray-200 dark:ring-gray-500/30'} ring-1`}
            >
                <span className="inline-flex items-center gap-2">
                    {hasApp ? t('mobile') : t('no-mobile')}
                    {hasApp ? <CircleCheck size={15} /> : <CircleX size={15} />}
                </span>
                <span>{price}$</span>
            </div>
        </div>
    );
};

export const FeaturesList = async ({
    items,
    lng,
}: {
    items: Features[];
    lng: string;
}) => {
    const { t } = await getTranslation(lng, 'payment');
    return (
        <div className="mb-6">
            <h3 className="mb-3 flex items-center gap-2 text-xs font-bold tracking-wider text-gray-600 uppercase dark:text-green-200">
                <Check className="size-3.5" />
                {t('selected-features')}
            </h3>
            <div className="space-y-3 rounded-xl bg-gray-50/50 p-4 dark:bg-green-900/10">
                {items.length > 0 ? (
                    items.map((item: Features) => (
                        <div
                            key={item.id}
                            className="group flex items-center justify-between text-sm"
                        >
                            <span className="font-bold text-gray-500 transition-colors group-hover:text-green-700 dark:text-gray-300 dark:group-hover:text-green-300">
                                {item.name}
                            </span>
                            <span className="font-mono font-bold text-gray-600 dark:text-gray-500">
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
    );
};
