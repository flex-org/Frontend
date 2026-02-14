import { getTranslation } from '@/i18n/server';
import { Database, Users } from 'lucide-react';

interface Props {
    lng: string;
    studentsCount: number;
    studentsPrice: number;
    storageCount: number;
    storagePrice: number;
}
export const ResourcesSummary = async ({
    lng,
    studentsCount,
    studentsPrice,
    storageCount,
    storagePrice,
}: Props) => {
    const { t } = await getTranslation(lng, 'payment');
    return (
        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex items-center justify-between rounded-2xl border border-green-50 bg-green-50/50 p-4 dark:border-green-800/50 dark:bg-green-900/20">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-xs font-bold tracking-wide text-green-700 uppercase dark:text-green-400">
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
            <div className="flex items-center justify-between rounded-2xl border border-green-50 bg-green-50/50 p-4 dark:border-green-800/50 dark:bg-green-900/20">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-xs font-bold tracking-wide text-green-700 uppercase dark:text-green-400">
                        <Database className="size-4" />
                        {t('storage')}
                    </div>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                        {storageCount}
                        <span className="text-sm font-medium text-gray-500 dark:text-green-200/50">
                            {' '}
                            {t('gb')}
                        </span>
                    </span>
                </div>
                <span className="rounded-md bg-green-200/60 p-1 dark:bg-green-600/40">
                    {storagePrice}$
                </span>
            </div>
        </div>
    );
};
