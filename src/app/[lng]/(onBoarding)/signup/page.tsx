import AuthHeader from '@/onBoarding/components/AuthHeader';
import AuthInfoPart from '@/onBoarding/components/AuthInfoPart';
import SignupForm from '@/onBoarding/signup/components/SignupForm';

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
