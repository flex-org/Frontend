import NotFoundComponent from '@/components/NotFoundComponent';
import { headers } from 'next/headers';
export const generateMetadata = async ({
    params,
}: {
    params: Promise<{ lng: string }>;
}) => {
    const { lng } = await params;

    return {
        title: lng === 'ar' ? 'الصفحة غير موجودة' : 'Page Not Found',
        description:
            lng === 'ar'
                ? 'عذراً، الصفحة التي تبحث عنها غير موجودة في منصة بلاتمي التعليمية. يمكنك العودة للصفحة الرئيسية للمتابعة.'
                : 'Sorry, the page you are looking for does not exist on Platme platform. You can return to the home page to continue.',
        // robots: {
        //     index: false,
        //     follow: true,
        // },
    };
};
const NotFound = async ({ params }: { params: Promise<{ lng: string }> }) => {
    await headers();
    const { lng } = await params;
    return <NotFoundComponent lng={lng} />;
};

export default NotFound;
