import AuthHeader from '@/onBoarding/components/AuthHeader';
import AuthInfoPart from '@/onBoarding/components/AuthInfoPart';
import VerifyEmail from '@/onBoarding/features/signup/components/VerifyEmail';

export const generateMetadata = async ({
    params,
}: {
    params: Promise<{ lng: string }>;
}) => {
    const { lng } = await params;
    return {
        title:
            lng === 'ar'
                ? 'التحقق من البريد الالكتروني'
                : 'Verify email address',
        description:
            lng === 'ar'
                ? 'التحقق من البريد الاكتروني للدخول الي منصة بلاتمي التعليمية'
                : 'Verify your email address to sign in to Platme.',
    };
};

const Verify = async ({ params }: { params: Promise<{ lng: string }> }) => {
    const { lng } = await params;
    return (
        <div className="relative">
            <AuthHeader lng={lng} />
            <div className="mx-auto mt-28 grid grid-cols-3 gap-6">
                <AuthInfoPart signin={false} lng={lng} />
                <VerifyEmail lng={lng} />
            </div>
        </div>
    );
};

export default Verify;
