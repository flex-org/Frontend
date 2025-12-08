import OnBoardingNavbar from '@/onBoarding/components/OnBoardingNavbar';
import HeroSection from '@/onBoarding/features/landing/components/HeroSection';
export default async function Home({
    params,
}: {
    params: Promise<{ lng: string }>;
}) {
    const { lng } = await params;
    return (
        <div className="min-h-screen">
            <OnBoardingNavbar lng={lng} />
            <HeroSection lng={lng} />
        </div>
    );
}
