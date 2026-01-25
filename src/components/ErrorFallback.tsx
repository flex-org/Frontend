'use client';
import {
    ArrowLeft,
    CheckCircle,
    CircleAlert,
    Copy,
    RefreshCw,
    TriangleAlert,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { useTranslation } from '@/i18n/client';
import { useGlobalStore } from '@/onBoarding/store/globalStore';
import ErrorBoundaryWarning from './ErrorBoundaryWarning';
import { useEffect, useState, useTransition } from 'react';
import ToolTipComponent from './ToolTipComponent';
import { Spinner } from './ui/spinner';
import { toast } from 'sonner';

interface ErrorFallbackProps {
    error: Error | { message: string };
    reset: () => void;
    lng: string;
}

const ErrorFallback = ({ error, reset, lng }: ErrorFallbackProps) => {
    const { t } = useTranslation(lng, 'error');
    const { count, increment, resetCount } = useGlobalStore();
    const [copied, setCopied] = useState(false);
    const [isPending, startTransition] = useTransition();
    //for sentry if used
    // useEffect(() => {
    //     console.error('Boundary Error:', error);
    // }, [error]);

    useEffect(() => {
        if (count === 3) {
            ErrorBoundaryWarning(t, lng);
            resetCount();
        }
    }, [count, lng, resetCount, t]);
    const handleReset = () => {
        increment();
        startTransition(() => {
            reset();
        });
    };
    const handleCopyError = (text: string) => {
        if (!navigator?.clipboard) {
            toast.error('Clipboard not supported');
            return;
        }
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center p-6 text-center">
            <div className="mb-4 rounded-full bg-red-50 p-4 dark:bg-red-900">
                <TriangleAlert className="text-red-500" />
            </div>
            <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-50">
                {t('error-boundary-error')}
            </h2>
            <p className="mb-6 max-w-md text-gray-500 dark:text-gray-400">
                {t('error-boundary-description')}
            </p>
            <div className="mb-6 flex max-w-xl items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <TriangleAlert className="size-4" />
                {t('error-boundary-network-error')}
            </div>
            <div
                dir="rtl"
                className="mb-6 flex w-full max-w-md justify-between overflow-hidden rounded-md border border-gray-200 bg-gray-100 p-3 dark:border-gray-700 dark:bg-gray-800"
            >
                <ToolTipComponent label={t('copy-error-msg')}>
                    {copied ? (
                        <CheckCircle className="size-4 text-green-500" />
                    ) : (
                        <Copy
                            className="size-4 cursor-pointer"
                            onClick={() => handleCopyError(error.message)}
                        />
                    )}
                </ToolTipComponent>
                <p className="wrap-break-words font-mono text-xs text-red-600">
                    <span className="text-black dark:text-gray-100">
                        error message:
                    </span>
                    {'    '}
                    {error.message || 'Unknown Error Occurred'}
                </p>
            </div>
            <div className="mb-6 flex max-w-xl items-center gap-2 text-xs text-red-500 dark:text-red-400">
                <CircleAlert className="size-4" />
                {t('error-boundary-warning-description')}{' '}
                <Link href={`${lng}/contact-us`} className="underline">
                    {' '}
                    {t('error-boundary-warning-from-here')}
                </Link>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                    variant="outline"
                    onClick={handleReset}
                    disabled={isPending}
                >
                    {t('error-boundary-try-again')}
                    {isPending ? <Spinner className="" /> : <RefreshCw />}
                </Button>
                <Link href={`/${lng}`}>
                    <Button
                        variant={null}
                        className="bg-green-800 text-white transition-colors hover:bg-green-900 active:bg-green-950"
                    >
                        {t('error-boundary-go-home')}
                        <ArrowLeft className={`ltr:rotate-180`} />
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default ErrorFallback;
