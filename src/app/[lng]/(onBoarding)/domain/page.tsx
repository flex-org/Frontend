import { getTranslation } from '@/i18n/server';
import DomainContent from '@/onBoarding/features/domain/components/DomainContent';

export const generateMetadata = async ({
    params,
}: {
    params: Promise<{ lng: string }>;
}) => {
    const { lng } = await params;
    return {
        title: lng === 'ar' ? 'إعداد الدومين' : 'Domain Setup',
        description:
            lng === 'ar'
                ? 'اختر اسم النطاق (الدومين) الخاص بأكاديميتك لتعزيز علامتك التجارية. يمكنك استخدام نطاق فرعي مجاني من بلاتمي لتبدو أكثر احترافية أمام طلابك. خطوة أساسية لبناء هوية رقمية قوية.'
                : 'Choose your academy domain name to strengthen your brand identity. You can use a free subdomain from Platme for a professional look. A crucial step in building a strong digital presence.',
    };
};

const DomainPage = async ({ params }: { params: Promise<{ lng: string }> }) => {
    const { lng } = await params;
    const { t } = await getTranslation(lng, 'domain');

    return (
        <div className="mt-24 px-2 pb-20 sm:px-0">
            <div className="flex flex-col items-center justify-center">
                <div className="flex w-full flex-col items-center justify-center gap-4">
                    <p className="text-3xl font-bold text-gray-900 md:text-6xl dark:text-white">
                        {t('domain-page-title')}
                    </p>
                    <p className="text-lg font-bold text-gray-900 md:text-xl dark:text-gray-300">
                        {t('domain-page-description')}
                    </p>
                </div>
                <DomainContent lng={lng} />
            </div>
        </div>
    );
};

export default DomainPage;
