
export default async function OnBoardingLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen">
            <main>{children}</main>
        </div>
    );
}
