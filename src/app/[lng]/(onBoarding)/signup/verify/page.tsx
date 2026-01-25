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
        <div className="px-0 sm:px-4">
            <AuthHeader lng={lng} />
            <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-4 rounded-3xl border border-green-300 lg:grid-cols-2 dark:border-green-800">
                <AuthInfoPart signin={false} lng={lng} />
                <VerifyEmail lng={lng} />
            </div>
        </div>
    );
};

export default Verify;
