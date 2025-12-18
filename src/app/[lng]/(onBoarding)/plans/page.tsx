import { getTranslation } from '@/i18n/server';
import AiCard from '@/onBoarding/features/plans/components/AiCard';
import DragAndDropCard from '@/onBoarding/features/plans/components/DragAndDropCard';

export const generateMetadata = async ({
    params,
}: {
    params: Promise<{ lng: string }>;
}) => {
    const { lng } = await params;
    return {
        title:
            lng === 'ar'
                ? 'اختر طريقة بناء أكاديميتك | تخصيص المنصة'
                : 'Choose Your Build Method | Academy Customization',
        description:
            lng === 'ar'
                ? 'ابدأ رحلة بناء أكاديميتك بالطريقة التي تفضلها. يمكنك استخدام واجهة السحب والإفلات المرنة لتصميم كل ركن يدويًا، أو الاستعانة بذكاء بلاتمي الاصطناعي (AI) لبناء منصة تعليمية متكاملة في ثوانٍ. تحكم كامل في مستقبلك التعليمي.'
                : 'Start building your academy your way. Choose between our flexible Drag & Drop interface for manual precision, or leverage Platme AI to generate a full-featured educational platform in seconds. Total control over your teaching environment.',
    };
};

const page = async ({ params }: { params: Promise<{ lng: string }> }) => {
    const { lng } = await params;
    const { t } = await getTranslation(lng, 'plans');
    return (
        <div className="mt-24 px-2 sm:px-0">
            <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-12">
                <div className="space-y-4 text-center">
                    <p className="text-2xl font-bold sm:text-6xl">
                        {t('main-title')}
                    </p>
                    <p className="text-sm font-semibold text-gray-700 sm:text-xl dark:text-gray-300">
                        {t('sub-title')}
                    </p>
                </div>
                <div className="flex w-full flex-col items-center justify-center gap-6 sm:flex-row">
                    <DragAndDropCard lng={lng} />
                    <AiCard lng={lng} />
                </div>
            </div>
        </div>
    );
};

export default page;
