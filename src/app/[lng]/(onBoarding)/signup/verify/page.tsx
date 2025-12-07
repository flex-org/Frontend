import AuthHeader from '@/onBoarding/components/AuthHeader';
import AuthInfoPart from '@/onBoarding/components/AuthInfoPart';
import VerifyEmail from '@/onBoarding/signup/components/VerifyEmail';

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
