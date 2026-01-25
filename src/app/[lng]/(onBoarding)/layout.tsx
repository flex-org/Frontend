import LoginButtonWithAvatar from '@/onBoarding/components/LoginButtonWithAvatar';
import OnBoardingNavbar from '@/onBoarding/components/OnBoardingNavbar';
import { ReactNode } from 'react';

export default async function OnBoardingLayout({
    children,
    params,
}: Readonly<{
    children: ReactNode;
    params: Promise<{ lng: string }>;
}>) {
    const { lng } = await params;
    return (
        <div className="min-h-screen">
            <OnBoardingNavbar lng={lng}>
                <LoginButtonWithAvatar lng={lng} />
            </OnBoardingNavbar>
            <main>{children}</main>
        </div>
    );
}
