import HeroSection from '@/onBoarding/features/landing/components/HeroSection';
import PlatmeNumbers from '@/onBoarding/features/landing/components/PlatmeNumbers';
import TrustedBy from '@/onBoarding/features/landing/components/TrustedBy';

export const generateMetadata = async ({
    params,
}: {
    params: Promise<{ lng: string }>;
}) => {
    const { lng } = await params;
    return {
        title: lng === 'ar' ? 'الصفحة الرئيسية' : 'Landing page',
        description:
            lng === 'ar'
                ? 'بلاتمي (Platme) هي الحل الأمثل لإنشاء أكاديميتك الرقمية. منصة تعليمية متعددة المستأجرين (SaaS) تمنحك السيطرة الكاملة لإنشاء موقعك التعليمي، إدارة الطلاب، الفصول الافتراضية، وبيع الدورات أونلاين. انضم لأقوى نظام إدارة تعلم (LMS) في الشرق الأوسط وابدأ رحلتك الآن.'
                : 'Platme is a premier multi-tenant educational platform (SaaS) designed for educators and institutions. Create your own branded Learning Management System (LMS), manage students, host virtual classrooms, and monetize your courses effortlessly. The ultimate white-label solution for online education.',
    };
};
export default async function Home({
    params,
}: {
    params: Promise<{ lng: string }>;
}) {
    const { lng } = await params;
    return (
        <div>
            <HeroSection lng={lng} />
            <TrustedBy lng={lng} />
            <PlatmeNumbers lng={lng} />
        </div>
    );
}
