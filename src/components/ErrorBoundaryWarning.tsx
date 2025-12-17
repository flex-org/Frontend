import { getTranslation } from '@/i18n/server';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

const ErrorBoundaryWarning = async (lng: string) => {
    const { t } = await getTranslation(lng, 'error');
    toast.warning(t('error-boundary-warning-word'), {
        description: (
            <div className="space-y-2">
                <p>{t('error-boundary-warning-description')}</p>
                <Link
                    href={`${lng}/contact-us`}
                    className="flex items-center justify-start underline"
                >
                    {' '}
                    {t('error-boundary-warning-from-here')}
                    <ArrowLeft
                        className={`${lng === 'en' ? 'rotate-180' : ''} size-3`}
                    />
                </Link>
            </div>
        ),
    });
};

export default ErrorBoundaryWarning;
