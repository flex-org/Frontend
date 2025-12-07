import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import '@/styles/globals.css';
import LayoutWrapper from './LayoutWrapper';
import { languages } from '@/i18n/settings';
import ToastWrapper from '@/components/ToastWrapper';
const cairo = Cairo({
    variable: '--font-cairo',
    subsets: ['latin', 'arabic'],
    weight: ['200', '300', '400', '500', '600', '700', '800', '900', '1000'],
});

export const metadata: Metadata = {
    title: {
        template: '%s - Platme',
        default: 'Welcome - Platme',
    },
    description:
        "platme, it's a multi-tenancy educational platform, user can create his own platform and add his students",
};

export async function generateStaticParams() {
    return languages.map((lng) => ({ lng }));
}

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ lng: string }>;
}>) {
    const { lng } = await params;

    return (
        <html lang={lng} dir={lng === 'ar' ? 'rtl' : 'ltr'}>
            <body className={`${cairo.variable} font-sans antialiased`}>
                <LayoutWrapper>
                    <ToastWrapper lng={lng} />
                    <div className="min-h-screen bg-[#f2f2f2] from-black to-green-950 dark:bg-linear-to-r">
                        <main className="container mx-auto flex h-full w-full flex-col">
                            {children}
                        </main>
                    </div>
                </LayoutWrapper>
            </body>
        </html>
    );
}
