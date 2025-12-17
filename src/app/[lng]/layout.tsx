import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import '@/styles/globals.css';
import LayoutWrapper from './LayoutWrapper';
import { languages } from '@/i18n/settings';
import ToastWrapper from '@/components/ToastWrapper';
const cairo = Cairo({
    variable: '--font-cairo',
    subsets: ['latin', 'arabic'],
    weight: ['400', '600', '700'],
});
const baseUrl = 'https://platme.vercel.app';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lng: string }>;
}): Promise<Metadata> {
    const { lng } = await params;

    const commonMetadata = {
        metadataBase: new URL(baseUrl),
        applicationName: 'Platme',
        authors: [{ name: 'Platme Team', url: `${baseUrl}/${lng}` }],
        creator: 'Platme Inc.',
        publisher: 'Platme Inc.',
        robots: {
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large' as const,
                'max-snippet': -1,
            },
        },
        icons: {
            icon: '/favicon.ico',
            shortcut: '/favicon-16x16.png',
            apple: '/apple-touch-icon.png',
        },
    };

    if (lng === 'ar') {
        return {
            ...commonMetadata,
            title: {
                template: '%s | بلاتــمي - منصتك التعليمية المتكاملة',
                default: 'بلاتمي - أنشئ منصتك التعليمية الخاصة في دقائق',
            },
            description:
                'بلاتمي (Platme) هي الحل الأمثل لإنشاء أكاديميتك الرقمية. منصة تعليمية متعددة المستأجرين (SaaS) تمنحك السيطرة الكاملة لإنشاء موقعك التعليمي، إدارة الطلاب، الفصول الافتراضية، وبيع الدورات أونلاين. انضم لأقوى نظام إدارة تعلم (LMS) في الشرق الأوسط وابدأ رحلتك الآن.',
            keywords: [
                'منصة تعليمية',
                'إنشاء موقع تعليمي',
                'نظام إدارة تعلم',
                'LMS عربي',
                'منصة متعددة المستأجرين',
                'فصول افتراضية',
                'تعليم عن بعد',
                'بيع دورات اونلاين',
                'SaaS تعليمي',
                'بلاتمي',
                'Platme',
            ],
            alternates: {
                canonical: `${baseUrl}/ar`,
                languages: {
                    'en-US': `${baseUrl}/en`,
                },
            },
            openGraph: {
                type: 'website',
                url: `${baseUrl}/ar`,
                siteName: 'بلاتمي Platme',
                locale: 'ar_EG',
                title: 'بلاتمي - أنشئ منصتك التعليمية الخاصة',
                description:
                    'ابدأ مشروعك التعليمي مع بلاتمي. منصة متكاملة تتيح لك بناء هويتك الرقمية، إضافة طلابك، وتقديم محتواك التعليمي بأحدث التقنيات.',
                images: [
                    {
                        url: '/og-image-ar.webp',
                        width: 1200,
                        height: 630,
                        alt: 'واجهة منصة بلاتمي التعليمية',
                    },
                ],
            },
            twitter: {
                card: 'summary_large_image',
                title: 'بلاتمي | بوابتك للتعليم الرقمي',
                description:
                    'هل تبحث عن أفضل منصة لإنشاء أكاديميتك؟ بلاتمي توفر لك نظام LMS متكامل متعدد المستأجرين. جربها الآن.',
                images: ['/og-image-ar.webp'],
            },
        };
    }
    return {
        ...commonMetadata,
        title: {
            template: '%s | Platme - Your Educational Platform',
            default: 'Platme - Build Your Own Online Platform',
        },
        description:
            'Platme is a premier multi-tenant educational platform (SaaS) designed for educators and institutions. Create your own branded Learning Management System (LMS), manage students, host virtual classrooms, and monetize your courses effortlessly. The ultimate white-label solution for online education.',
        keywords: [
            'Multi-tenancy platform',
            'Educational platform builder',
            'LMS SaaS',
            'Create online academy',
            'White-label LMS',
            'E-learning solution',
            'Online teaching platform',
            'Student management system',
            'Platme',
            'Virtual classroom',
        ],
        alternates: {
            canonical: `${baseUrl}/en`,
            languages: {
                'ar-EG': `${baseUrl}/ar`,
            },
        },
        openGraph: {
            type: 'website',
            url: `${baseUrl}/en`,
            siteName: 'Platme',
            locale: 'en_US',
            title: 'Platme - Launch Your Academy Today',
            description:
                'Empower your teaching with Platme. The all-in-one multi-tenant platform to build, manage, and scale your educational business with ease.',
            images: [
                {
                    url: '/og-image-en.webp',
                    width: 1200,
                    height: 630,
                    alt: 'Platme Dashboard Interface',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Platme | Best Multi-tenant LMS',
            description:
                'Looking for a powerful LMS? Platme allows you to create your own educational platform instantly. Join the future of e-learning.',
            images: ['/og-image-en.jpg'],
        },
    };
}

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
            {/* <Head>
                 <link rel="preconnect" href="https://example.com" crossOrigin="anonymous" />
            </Head> */}
            <body className={`${cairo.variable} font-sans antialiased`}>
                <LayoutWrapper>
                    <ToastWrapper lng={lng} />
                    <div className="min-h-screen bg-[#f2f2f2] from-black to-green-950 dark:bg-linear-to-r">
                        <main className="container mx-auto px-2 sm:px-0">{children}</main>
                    </div>
                </LayoutWrapper>
            </body>
        </html>
    );
}
