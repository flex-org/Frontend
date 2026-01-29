'use client';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from '@/i18n/client';
import { useTransition } from 'react';
import { storeData } from '../actions/onBoardingActions';
import { toast } from 'sonner';
import { FinalSellingSystemData } from '../types';
import { Spinner } from '@/components/ui/spinner';

const BackAndForwardButtons = ({
    lng,
    nextPage,
    disabled,
    storedData,
    endPoint,
}: {
    lng: string;
    nextPage?: string;
    disabled?: boolean;
    storedData?:
        | { features: number[] }
        | FinalSellingSystemData
        | { domain: string };
    endPoint?: string;
}) => {
    const { t } = useTranslation(lng, 'drag-drop');
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname();
    const router = useRouter();
    const WrongBackPages =
        pathname === `/${lng}/build` || pathname === `/${lng}/gomaa`;
    const WrongForwardPages = pathname === `/${lng}/payment`;
    const handleStore = () => {
        startTransition(async () => {
            const data = await storeData(storedData, endPoint);
            if (!data.ok) {
                toast.error(data.error.message);
                return;
            }
            router.push(`/${lng}/${nextPage}`);
        });
    };

    return (
        <div className="mb-8 flex justify-between">
            <div className="flex justify-start">
                {!WrongBackPages && (
                    <Button
                        size="lg"
                        variant={'outline'}
                        onClick={() => router.back()}
                    >
                        {t('back')}
                    </Button>
                )}
            </div>
            <div className="flex justify-end">
                {!WrongForwardPages && (
                    <Button
                        size="lg"
                        disabled={disabled || isPending}
                        variant={null}
                        onClick={handleStore}
                        className="bg-green-800 text-white hover:bg-green-900 active:bg-green-950"
                    >
                        <div className="flex items-center gap-2">
                            {isPending ? (
                                <>
                                    {t('saving')}
                                    <Spinner />
                                </>
                            ) : (
                                t('continue')
                            )}
                        </div>
                    </Button>
                )}
            </div>
        </div>
    );
};

export default BackAndForwardButtons;
