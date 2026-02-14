import { getTranslation } from '@/i18n/server';
import { Globe } from 'lucide-react';

export const DomainSummary = async ({
    lng,
    domain,
}: {
    lng: string;
    domain: string;
}) => {
    const { t } = await getTranslation(lng, 'payment');
    return (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-green-200 bg-white p-3 shadow-sm ring-1 ring-green-50 dark:border-green-800 dark:bg-green-950 dark:ring-green-900">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400">
                <Globe className="size-5" />
            </div>
            <div className="flex flex-col overflow-hidden">
                <span className="text-xs font-bold tracking-wider text-gray-700 uppercase dark:text-green-200">
                    {t('platform-link')}
                </span>
                <span
                    className="truncate text-sm font-bold text-gray-900 dark:text-green-50"
                    dir="ltr"
                >
                    <span className="text-green-700 dark:text-green-400">
                        https://
                    </span>
                    {domain}.platme.com
                </span>
            </div>
        </div>
    );
};
