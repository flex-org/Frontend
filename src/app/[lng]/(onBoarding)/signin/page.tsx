import AuthHeader from '@/onBoarding/components/AuthHeader';
import AuthInfoPart from '@/onBoarding/components/AuthInfoPart';
import SignInForm from '@/onBoarding/features/signin/components/SignInForm';

export const generateMetadata = async ({
    params,
}: {
    params: Promise<{ lng: string }>;
}) => {
    const { lng } = await params;
    return {
        title: lng === 'ar' ? 'تسجيل الدخول' : 'Sign in',
        description:
            lng === 'ar'
                ? 'تسجيل الدخول الي منصة بلاتمي التعليمية متعددة المستأجرين'
                : 'Sign in to Platme, multi-tenancy educational platform  .',
    };
};

const SignInPage = async ({ params }: { params: Promise<{ lng: string }> }) => {
    const { lng } = await params;
    return (
        <div className="relative">
            <AuthHeader lng={lng} />
            <div className="mx-auto mt-28 grid grid-cols-3 gap-6">
                <AuthInfoPart signin={true} lng={lng} />
                <SignInForm lng={lng} />
            </div>
        </div>
    );
};

export default SignInPage;
