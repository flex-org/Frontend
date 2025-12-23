'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from '@/i18n/client';

const BackAndForwardButtons = ({
    lng,
    nextPage,
    disabled,
}: {
    lng: string;
    nextPage: string;
    disabled: boolean;
}) => {
    const { t } = useTranslation(lng, 'drag-drop');
    const pathname = usePathname();
    const router = useRouter();
    return (
        <div className="mb-8 flex justify-between">
            <div className="flex justify-start">
                {pathname !== `/${lng}/build` ||
                    (pathname !== `/${lng}/gomaa` && (
                        <Button
                            size="lg"
                            variant={'outline'}
                            onClick={() => router.back()}
                        >
                            {t('back')}
                        </Button>
                    ))}
            </div>
            <div className="flex justify-end">
                <Button
                    size="lg"
                    disabled={disabled}
                    variant={null}
                    className="bg-green-800 text-white hover:bg-green-900 active:bg-green-950"
                >
                    <Link href={`/${lng}/${nextPage}`}>{t('continue')}</Link>
                </Button>
            </div>
        </div>
    );
};

export default BackAndForwardButtons;
