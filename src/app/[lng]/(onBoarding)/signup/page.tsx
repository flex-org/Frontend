import AuthHeader from '@/onBoarding/components/AuthHeader';
import AuthInfoPart from '@/onBoarding/components/AuthInfoPart';
import SignupForm from '@/onBoarding/features/signup/components/SignupForm';

export const generateMetadata = async ({
    params,
}: {
    params: Promise<{ lng: string }>;
}) => {
    const { lng } = await params;
    return {
        title: lng === 'ar' ? 'إنشاء حساب جديد' : 'Sign Up',
        description:
            lng === 'ar'
                ? 'إنشاء حساب جديد للدخول الي منصة بلاتمي التعليمية '
                : 'Sign up to Platme .',
    };
};

const Signup = async ({ params }: { params: Promise<{ lng: string }> }) => {
    const { lng } = await params;
    return (
        <div className="relative">
            <AuthHeader lng={lng} />
            <div className="mx-auto mt-28 grid grid-cols-3 gap-6">
                <AuthInfoPart signin={false} lng={lng} />
                <SignupForm lng={lng} />
            </div>
        </div>
    );
};

export default Signup;
