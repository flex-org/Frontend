'use client';

import Link from 'next/link';
import { FileQuestion, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/i18n/client';

const NotFoundComponent = ({ lng }: { lng: string }) => {
    const { t } = useTranslation(lng, 'not-found');
    const router = useRouter();
    const handleGoBack = () => {
        router.back();
    };
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 transition-colors duration-300 dark:bg-green-950">
            <div className="w-full max-w-md text-center">
                <div className="relative mb-8 flex justify-center">
                    <div className="absolute inset-0 rounded-full bg-green-500/20 blur-3xl dark:bg-green-500/10" />
                    <div className="relative rounded-2xl border border-green-100 bg-white p-6 shadow-xl dark:border-green-800 dark:bg-green-900">
                        <FileQuestion className="size-20 text-green-600 dark:text-green-400" />
                    </div>
                </div>
                <h1 className="mb-2 text-8xl font-black text-green-700 dark:text-green-500">
                    404
                </h1>
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                    {t('page-not-found')}
                </h2>
                <p className="mb-10 leading-relaxed text-gray-600 dark:text-gray-400">
                    {t('wrong-path')}
                </p>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Link href={`/${lng}`} className="w-full sm:w-auto">
                        <Button
                            variant={null}
                            size="lg"
                            className="w-full gap-2 rounded-md bg-green-800 text-white shadow-lg hover:bg-green-900 active:bg-green-950 sm:w-auto"
                        >
                            <Home className="size-5" />
                            {t('go-to-main')}
                        </Button>
                    </Link>
                    <Button
                        onClick={handleGoBack}
                        variant="outline"
                        size="lg"
                        className="w-full gap-2 rounded-md transition-all sm:w-auto"
                    >
                        {t('go-back')}
                        <ArrowLeft className="size-5" />
                    </Button>
                </div>

                <p className="mt-12 text-sm text-gray-600 dark:text-gray-400">
                    Platme - Educational SaaS Platform
                </p>
            </div>
        </div>
    );
};

export default NotFoundComponent;
