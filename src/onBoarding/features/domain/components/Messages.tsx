import { AppError } from '@/types/api';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface Props {
    showSuccess: boolean;
    showError: boolean;
    inputError: string | null;
    error: AppError | null;
    isPending: boolean;
    t: (key: string) => string;
}

const Messages = ({
    showSuccess,
    showError,
    inputError,
    error,
    isPending,
    t,
}: Props) => {
    console.log(error);
    return (
        <div className="mb-10 flex h-6 justify-start">
            {showSuccess && (
                <p className="flex items-center gap-2 text-xs text-green-700 sm:text-sm dark:text-green-500">
                    {t('domain-available')}
                    <CheckCircle2 className="size-4" />
                </p>
            )}
            {showError && (
                <p className="flex items-center gap-2 text-xs text-red-700 sm:text-sm dark:text-red-500">
                    {t('domain-not-available')}
                    <AlertCircle className="size-4" />
                </p>
            )}
            {inputError && (
                <p className="text-xs text-red-700 sm:text-sm dark:text-red-500">
                    {inputError}
                </p>
            )}
            {error && !isPending && (
                <p className="text-xs text-red-700 sm:text-sm dark:text-red-500">
                    {error.status === 422 ? t('domain-error') : error.message}
                </p>
            )}
        </div>
    );
};

export default Messages;
