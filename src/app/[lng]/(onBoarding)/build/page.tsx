import { getTranslation } from '@/i18n/server';
import DragAndDropContent from '@/onBoarding/features/build/components/DragAndDropContent';
import DragDropSkeleton from '@/onBoarding/features/build/components/DragDropSkeleton';
import { Suspense } from 'react';

export const generateMetadata = async ({
    params,
}: {
    params: Promise<{ lng: string }>;
}) => {
    const { lng } = await params;
    return {
        title:
            lng === 'ar' ? 'تخصيص مزايا المنصة' : 'Customize Platform Features',
        description:
            lng === 'ar'
                ? 'قم بتصميم أكاديميتك التعليمية بلمسة واحدة. اسحب وأفلت المميزات (Drag & Drop) التي تناسب طلابك، مثل الاختبارات، الفصول الافتراضية، ومنتدى النقاش، وخصص تجربة التعلم بالكامل عبر لوحة تحكم بلاتمي المتطورة.'
                : 'Design your educational academy with a single touch. Drag and drop the features that suit your students, such as quizzes, virtual classrooms, and discussion forums. Fully customize the learning experience using Platme’s advanced dashboard.',
    };
};
const Build = async ({ params }: { params: Promise<{ lng: string }> }) => {
    const { lng } = await params;
    const { t } = await getTranslation(lng, 'drag-drop');
    return (
        <div className="mt-24 px-2 pb-20 sm:px-0">
            <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-12">
                <div className="space-y-4 text-center">
                    <p className="text-2xl font-bold sm:text-6xl">
                        {t('main-title')}
                    </p>
                    <p className="text-sm font-semibold text-gray-700 sm:text-xl dark:text-gray-300">
                        {t('sub-title')}
                    </p>
                </div>
                <Suspense fallback={<DragDropSkeleton />}>
                    <DragAndDropContent lng={lng} />
                </Suspense>
            </div>
        </div>
    );
};

export default Build;
