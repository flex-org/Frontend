import { TFunction } from 'i18next';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

const ErrorBoundaryWarning = (t: TFunction, lng: string) => {
    toast.warning(t('error-boundary-warning-word'), {
        description: (
            <div className="space-y-2">
                <p>{t('error-boundary-warning-description')}</p>
                <Link
                    href={`${lng}/contact-us`}
                    className="flex items-center justify-start underline"
                >
                    {t('error-boundary-warning-from-here')}
                    <ArrowLeft className={`size-3 ltr:rotate-180`} />
                </Link>
            </div>
        ),
        duration: 5000,
    });
};

export default ErrorBoundaryWarning;
