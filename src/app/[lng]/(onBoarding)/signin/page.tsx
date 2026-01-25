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
        <div>
            <AuthHeader lng={lng} />
            <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-4 rounded-3xl border border-green-300 lg:grid-cols-2 dark:border-green-800">
                <AuthInfoPart signin={true} lng={lng} />
                {/* <div className='absolute w-4 h-100 rounded-full dark:bg-green-800 bg-white top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%]' /> */}
                <SignInForm lng={lng} />
            </div>
        </div>
    );
};

export default SignInPage;
