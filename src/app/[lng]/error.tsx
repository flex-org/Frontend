'use client';

import ErrorBoundaryWarning from '@/components/ErrorBoundaryWarning';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/i18n/client';
import { useGlobalStore } from '@/onBoarding/store/globalStore';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
    const { count, increment, resetCount } = useGlobalStore();
    const pathname = usePathname();
    const segments = pathname.split('/');
    const lng = segments[1];
    const { t } = useTranslation(lng, 'error');

    const handleReset = () => {
        increment();
        reset();
    };
    if (count === 3) {
        ErrorBoundaryWarning(lng);
        resetCount();
    }
    return (
        <div className="mx-auto h-screen w-full max-w-3xl px-4 pt-48">
            <div className="flex flex-col items-center justify-center space-y-6 rounded-lg border border-green-600/40 p-12">
                <AlertCircle className="size-20 text-red-500" />
                <div className="flex flex-col space-y-6">
                    <div className="flex flex-col items-center justify-center gap-6">
                        <p className="text-4xl font-bold">
                            {t('error-boundary-error')}
                        </p>
                        <p className="text-xl font-bold text-red-500">
                            {error.message}
                        </p>
                    </div>
                    <div className="flex justify-center gap-4">
                        <Button variant={'outline'} onClick={handleReset}>
                            {t('error-boundary-try-again')}
                        </Button>
                        <Link href={`/${lng}`}>
                            <Button
                                variant={null}
                                className="bg-green-700 text-white hover:bg-green-800 active:bg-green-900"
                            >
                                {t('error-boundary-go-home')}
                                <ArrowLeft
                                    className={`${lng === 'en' ? 'rotate-180' : ''}`}
                                />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Error;
