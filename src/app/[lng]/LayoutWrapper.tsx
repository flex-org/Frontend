'use client';
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
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
    );
}
