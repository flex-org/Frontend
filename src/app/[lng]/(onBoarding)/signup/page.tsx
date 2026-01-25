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
        <div className="px-0 sm:px-4">
            <AuthHeader lng={lng} />
            <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-4 rounded-3xl border border-green-300 lg:grid-cols-2 dark:border-green-800">
                <AuthInfoPart signin={false} lng={lng} />
                <SignupForm lng={lng} />
            </div>
        </div>
    );
};

export default Signup;
