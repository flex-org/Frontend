import { getTranslation } from '@/i18n/server';
import PreferencesContent from '@/onBoarding/features/preferences/components/PreferencesContent';
import PreferencesSkeleton from '@/onBoarding/features/preferences/components/PreferencesSkeleton';
import { AlertCircle } from 'lucide-react';
import { Suspense } from 'react';

export const generateMetadata = async ({
    params,
}: {
    params: Promise<{ lng: string }>;
}) => {
    const { lng } = await params;
    return {
        title: lng === 'ar' ? 'تفضيلات المنصة ' : 'Platform Preferences',
        description:
            lng === 'ar'
                ? 'قم بضبط إعدادات أكاديميتك الأساسية. حدد عدد الطلاب المتوقع، اختر خطة التخزين المناسبة، وحدد نظام البيع (بالكورس، بالقسم أو بالجلسة) ليتناسب مع نموذج عملك التعليمي. هذه الخطوة تضمن تخصيص تجربة بلاتمي لتلائم احتياجاتك.'
                : 'Configure your platform core settings. Define expected student numbers, select storage plans, and choose your selling approach (by course, category, or session) to fit your business model. Customize your Platme experience to match your specific needs.',
    };
};
const PreferencesPage = async ({
    params,
}: {
    params: Promise<{ lng: string }>;
}) => {
    const { lng } = await params;
    const { t } = await getTranslation(lng, 'preferences');
    return (
        <div className="mt-24 px-2 pb-20 sm:px-0">
            <div className="flex flex-col items-center justify-center">
                <div className="flex w-full flex-col justify-start gap-4">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {t('selected-features')}
                    </h2>
                    <div className="mb-4 flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <AlertCircle className="size-3" />
                        <p className="text-xs sm:text-sm">
                            {t('do-not-refresh')}
                        </p>
                    </div>
                </div>
                <Suspense fallback={<PreferencesSkeleton />}>
                    <PreferencesContent lng={lng} />
                </Suspense>
            </div>
        </div>
    );
};

export default PreferencesPage;
