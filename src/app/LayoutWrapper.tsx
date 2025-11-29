'use client'
import dynamic from "next/dynamic";
const ThemeProvider = dynamic(() => import('@/components/theme-provider').then((mod) => mod.ThemeProvider), { ssr: false })
const I18nProvider = dynamic(() => import('@/i18n/I18nProvider').then((mod) => mod.I18nProvider), { ssr: false })

export default function LayoutWrapper({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <I18nProvider>
                {children}
            </I18nProvider>
        </ThemeProvider>
    );
}
