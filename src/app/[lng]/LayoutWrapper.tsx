'use client';
import { SessionProvider } from 'next-auth/react';
import dynamic from 'next/dynamic';
const ThemeProvider = dynamic(
    () =>
        import('@/components/theme-provider').then((mod) => mod.ThemeProvider),
    { ssr: false },
);

export default function LayoutWrapper({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SessionProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
        </SessionProvider>
    );
}
